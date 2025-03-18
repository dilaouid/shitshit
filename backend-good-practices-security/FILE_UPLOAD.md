# File upload security and good practices checklist

If you're planning to implement a file upload system in your platform, it's crucial to ensure that the process is secure and won't expose your project to potential security exploits. Below is a comprehensive checklist to help you implement a minimally protected file upload feature:
- **Check the uploaded file**:
	- [ ] Check if the authentified user is allowed to upload a file
 	- [ ] Check if the authentified user uploading a file is not a bot (essentially by Recaptcha v3 methods or others)
	- [ ] You must check if the file is valid before storing it server side :
		- [ ] Check if the size is acceptable to avoid [Denial of Service](https://www.paloaltonetworks.com/cyberpedia/what-is-a-denial-of-service-attack-dos) (DoS) attack
		- [ ] Don't rely solely on the file extension, but also check the [mime type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types) as well.
			- [ ] Check if the [mime type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types) is acceptable
			- [ ] Avoid uploading php files (check the filename/mimetype turned to lowercase) to avoid [Remote Code Execution (RCE) exploits](https://www.checkpoint.com/cyber-hub/cyber-security/what-is-remote-code-execution-rce/). It also includes extensions like `php1`, `php2`, `php3`, `php4`, `php5`, `php6`, `phtml`....
			- [ ] Check the filename to avoid [Path Traversal](https://owasp.org/www-community/attacks/Path_Traversal) exploits (the filename must not be named like a path).
			- [ ] Avoid using the content-header to determine file type, as it can be manipulated by attackers (the headers are never safe). 
			- [ ] Sanitize filenames by avoid special characters such as `%`, `;`, `:`, `>`, `<`, `/`, `\`, `.`, `*` to protect your project from [Null Byte injection](https://www.thehacker.recipes/web/inputs/null-byte-injection), [Path Traversal](https://owasp.org/www-community/attacks/Path_Traversal) and various others attacks.
			- [ ] When uploading a `svg` or any `XML` file, parse it correctly to avoid [XXE](https://portswigger.net/web-security/xxe) or [XSS](https://owasp.org/www-community/attacks/xss/) attacks (in the case of `svg` files)
			- [ ] When checking the filename, be careful about the [obfuscated file extensions](https://www.seqrite.com/blog/how-to-avoid-dual-attack-and-vulnerable-files-with-double-extension) (like `exploit.png.sh` or `exploit.jpeg.php`)
		- [ ] Check if the file is not a malware using an antivirus library:
			- **NodeJS**: [clamscan](https://www.npmjs.com/package/clamscan)
			- **PHP**: [clamav](https://www.howtoforge.com/scan_viruses_with_php_clamavlib)
		- [ ] If the uploaded file is a picture, and you don't want it to be animated, know that GIF files are not the only one to be animated, [APNG files](https://en.wikipedia.org/wiki/APNG) are animated too.
	- [ ] Feel free to use a third party library that manage your upload feature, but be sure that you also check if everything is correct in your side:
		- **NodeJS**: [multer](https://www.npmjs.com/package/multer) or [formidable](https://www.npmjs.com/package/formidable).
			- [Article of Panu Pitkamaki comparing the two libraries](https://bytearcher.com/articles/formidable-vs-busboy-vs-multer-vs-multiparty/).
- **Rename the uploaded file:**
	- [ ] Your file has been renamed **server side** with a random string (uuid or random string of at least 16 characters), to prevent filename guessing attacks.
	- [ ] The data of your file is stored in your database, with data like:
		- id (*not sequential*)
		- original filename
		- new filename
		- uploaded date
		- [mime type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types) (***only*** if the file is not encrypted)
		- file size
		- ... other informations necessary to make your platform functional
	- [ ] Do not store the base64 in your database.
- **Choose your destination wisefully:**
	- [ ] Create multiple folders in a `uploads` (or a different name) repertory. But be sure it won't be guessable, so avoid using sequential folder name to prevent unauthorized access.
	- [ ] Store the uploaded files in a non-public folder to prevent unauthorized access.
	- [ ] Alternatively, consider using a [CDN](https://www.cloudflare.com/fr-fr/learning/cdn/what-is-a-cdn/) to store your files securely.
- **File access:**
	- [ ] According to the data in the database, only some users may be able to access a specific uploaded file. Make sure that the route that is returning your file have a good middleware and strong verifications.
	- [ ] Avoid writing the path or the filename inside the route returning the file, but use a unique identifier from the database to fetch the file. For example:

	
	| id | filename | original_filename | uploaded_date | mime_type |
	|--|--|--|--|--|
	| e7092b88-bda0-49e1-a700-47c64942b5ef | d6485Jbfdlk8721c3x83x.png | image.png | 2023-10-10 | image/png |


	- **Good:** `http://api.website.com/files/{user_id_or_any_other_id_or_hash}/e7092b88-bda0-49e1-a700-47c64942b5ef`
	- **Bad:**
		- `http://api.website.com/images/d6485Jbfdlk8721c3x83x.png`
		- `http://api.website.com/images/d6485Jbfdlk8721c3x83x`
		- `http://api.website.com/images/image.png`
		- `http://api.website.com/path?=images/image.png`
- **Bonus**:
	- [ ] Consider encrypting your files using [symmetrical or asymmetrical algorithms](https://preyproject.com/blog/types-of-encryption-symmetric-or-asymmetric-rsa-or-aes) (such as [AES256](https://www.ipswitch.com/blog/use-aes-256-encryption-secure-data) or [RSA2048](https://www.techtarget.com/searchsecurity/definition/RSA)). **ENCODING IS NOT ENCRYPTING !**
	- [ ] Implement disk usage quotas for each user with a `filesize` data field in your database to prevent users from uploading multiple excessively large files.
	- [ ] Be careful of what your users upload in YOUR server.
