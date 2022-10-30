// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { existsSync, statSync, PathLike, createReadStream, ReadStream } from 'fs'
import { OutgoingHttpHeader, OutgoingHttpHeaders } from 'http';
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path';

// ok if you can't understand the line below just stop here lmao
const VIDEOS_PATH = '/videos';

// /api/streaming?id=[VIDEO_ID]
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const range: string | null = req.headers.range ?? null;
    // if the header range is invalid, return a 400 error
    if (!range)
      return res.status(400).send('Undefined range header')

    const file: string|string[]|null = req.query.id ?? null;
    const videoPath: PathLike = path.join(process.cwd(), VIDEOS_PATH + "/" + file + '.mp4');

    // if the video file doesn't exists, return an error.
    // Optional: You can even set a specific video to show there's an error, like a rickroll or your mo-
    if (existsSync(videoPath) == false)
      return res.status(404).send('Video not found')
    
    // Get the video size in bytes
    const size: number = statSync(videoPath).size;

    // We take out everything which is not a number in the header range
    // So we can get the start range value from it
    const start: number = Number(range?.replace(/\D/g,""));

    // We will read the video by small chop, let's say 1mb per 1mb, ok?
    // change this value as you wish
    const part: number = 1000000;

    // now we will define the end of the part we're about to stream, ok?
    // so it's the "start" we defined earlier + the "part" we just defined

    // BUT !! if that sum is > to the video size - 1 (to ignore the EOF)
    // we just end the video at well, the end of the actual video
    const end: number = Math.min(start + part, size - 1);
    
    // The size of the content to send to the client (+1 for the EOF)
    const contentLength: number = end - start + 1;

    // Now we define the headers we're about to send, ok?
    const headers: OutgoingHttpHeaders | OutgoingHttpHeader[] = {
      "Content-Range": `bytes ${start}-${end}/${size}`, // the content-range header is defined such: bytes start-end/sizeOfWholeContent
      "Accept-Ranges": "bytes", // ofc lmao
      "Content-Length": contentLength, // the content we're about to display
      "Content-Type": "video/mp4" // for this example we just show mp4, but you can manage to also show webm (not avi ffs)
    };

    // Now we have a good header
    // 206 status code because it's a partial content
    res.writeHead(206, '', headers);

    // Now we create that stream or what? lmao
    // between that start and end as we precised earlier
    const stream: ReadStream = createReadStream(videoPath, { start, end });

    // we attach that READABLE stream to a WRITABLE stream so
    // we can display that shitty video
    // Yes, 'res' is a stream
    stream.pipe(res);
  }
}
