import express, { Express, Request, Response } from 'express';
import fs from 'fs';

const app: Express = express();

// Notez que c'est une route très basique, et qu'il y a beaucoup de choses à améliorer
// comme sauvegarder les timestamps de lecture, mettre l'id de la vidéo dans l'URL, les sous-titres, etc.
app.get('/video', (req: Request, res: Response) => {

    const range = req.headers.range;
    if (!range)
        // Une erreur 400 (Bad Request) est renvoyée si le client n'a pas fourni de Range header
        // (dû à une difficulté à traiter ou comprendre la requête, car le header est incomplet,
        // ou parce que le format de la requête est incorrect, car le range n'est pas fourni et est
        // nécessaire pour la lecture de la vidéo)
        return res.status(400).send('Invalid Range header');

    // On récupère le chemin de la vidéo à lire
    const path = './videos/chainsawman.mp4';

    // On récupère la taille du fichier en bytes
    const fileSize = fs.statSync(path).size;

    // On remplace tout ce qui n'est pas un chiffre par du rien,
    // pour obtenir le début du range
    const start = Number(range.replace(/\D/g, ''));

    // On lira le fichier en morceaux de 1 000 000 bytes, soit 1 Mb
    const part = 1000000;

    // On calcule la fin du range, donc au point du start + la valeur de part (qui vaut 1Mb ici)
    const end = Math.min(start + part, fileSize - 1);

    // La taille du contenu à lire, donc la fin du range - le début du range, + 1 byte null
    const contentLength = (end - start) + 1;

    // On définit les headers de la réponse à envoyer au client
    const headers = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': contentLength,
        'Content-Type': 'video/mp4',
    };
    // On écrit les headers dans la réponse
    res.writeHead(206, headers);

    // On crée un stream de lecture de la vidéo, en commençant à la position start, et end définit
    // plus tôt
    const stream = fs.createReadStream(path, { start  , end });

    // On attache le stream à la réponse, et on envoie la réponse au client
    // car oui, res est un stream aussi :^)
    stream.pipe(res);

});

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(8080, () => {
  console.log(`⚡️[server]: Server is running in http://localhost:8080`);
});
