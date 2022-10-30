# Video Streaming Basic

![simpson chainsaw man](https://raw.githubusercontent.com/dilaouid/shitshit/main/readme/streaming.jpg)

  
Stop using weirds video source attributes in your website. Nobody wants to download your 150 MB video before playing it. We want it being **CHUNKY** BRO !|

Yes, yes yes there is the **`buffered`** attributes in the `<video>` tag in html5. However this is not enough.
What if you want to switch languages, use subtitles, making an adaptative video quality for your video, save the video progression, segment your video...

In this project, you **won't**:

 - Use subtitles
 - Making adaptative quality
 - Set Dash, HLS or Smooth Streaming protocols

However, with this "boilerplate" like project, you'll be able to at least switch languages according to your architecture. The streaming part is in `pages/api/streaming.ts`. Everything is documented so you may adjust it as you wish.

Feel free to add database queries to save the user progression, pick the user language to pick the correct video, and being original, well, do what you want.

But for big videos, don't link them immediately to your `src` attributes. It's bad habit and everyone knows it.
