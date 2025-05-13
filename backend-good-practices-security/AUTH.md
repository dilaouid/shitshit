# Auth security and good practices checklist

Please note that this is in the case you are doing the auth system yourself. If you are using a third party library, be sure to check if everything is correct in your side.

| Difficulty | Name | Description | Reference |
|------------|------|--------------------|-----------|
| 🟡 | Store in cookies (not in localstorage) | Store tokens (JWT or others) in secured cookies (httponly / secure), **never** in localstorage. | [OWASP JWT Storage](https://owasp.org/www-community/controls/SecureCookieAttribute) |
| 🟡 | Refresh & Access Token | Use a refresh token system with short-lived access tokens to enhance authentication security. | [OWASP What is Refrtesh token](https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/) |
| 🔴 | Identify connected devices | Detect and disconnect previously connected devices when a password change occurs. | [OWASP Session Management](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#renew-the-session-id-after-any-privilege-level-change) |
| 🟢 | No incremental IDs (1,2,3,4...) | Never use incremental IDs to prevent malicious enumeration. Use UUIDs (or nanoid idc) or other secure IDs. | [OWASP - Identifier Security](https://www.vaadata.com/blog/fr/failles-idor-principes-attaques-exploitations-mesures-tests-securite/) |
| 🔴 | Identify connected devices | Check every device to logout from every other when you change your password for example, or to make the user check for his devices. | [OWASP Session Management](https://owasp.org/www-community/attacks/Session_hijacking_attack) |
| 🟡 | Global logout on password change | If a user changes their password, invalidate all other sessions to prevent unauthorized access. | [Session Management OWASP](https://owasp.org/www-project-top-ten/) |
| 🟡 | Secure sensitive information storage | Never store sensitive information (essentially password in this case) in plaintext. Always use secure hashing and proper encryption (md5 is not encryption please stop it). | [Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html) |
| 🟡 | Automatic logout | Implement an automatic logout after a defined period of inactivity (somehow included with refresh tokens). | [OWASP Session Timeout](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html#automatic-session-expiration) |
| 🟡 | Brute-force | Limit login attempts to prevent brute-force attacks using rate-limiting or CAPTCHA systems. | [OWASP Rate Limiting](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html#protect-against-automated-attacks) |
| 🔴 | Security notifications | Notify users by email of suspicious activities or access from new devices. | [OWASP Security Logging](https://owasp.org/Top10/A09_2021-Security_Logging_and_Monitoring_Failures//) |
| 🟡 | Form input validations with Zod | Systematically validate all input data, especially credentials and passwords, using libraries like Zod. | [Zod](https://github.com/colinhacks/zod) |
| 🟡 | Lockout account after too many failures of login | Implement a temporary lockout system after multiple failed login attempts to protect against brute-force attacks. | [OWASP Blocking Attacks](https://owasp.org/www-community/attacks/Credential_stuffing) |
| 🟡 | 2FA (Two-Factor Authentication) | Provide and encourage the use of two-factor authentication. Store keys securely. | [2FA OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html) |
| 🟡 | Audit and detailed logs | Maintain a secure log of authentication attempts, especially failures, to quickly detect suspicious activities. | [OWASP Logging](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html) |

### Bonus:
- [ ] **Secure password reset** using temporary email links with expiration.
- [ ] **CSRF protection** using specific tokens on every important form (avoid submitting the form from a third party app)
- [ ] **Limit simultaneous active sessions** per user (according to your product).
