# Publish the GRAISIX website

This guide assumes you own `graisix.com` and can edit its DNS settings. If your domain is different, update the canonical and social URL entries in the HTML and in `sitemap.xml` before uploading.

## 1. Download and extract the website

1. Download `GRAISIX-website-updated.zip`.
2. In File Explorer, right-click the ZIP and choose **Extract All**.
3. Open the extracted `GRAISIX-final` folder. You should see `index.html`, `css`, `js`, `assets`, and `projects` together.

## 2. Create a GitHub repository

1. Sign in to GitHub and choose **New repository**.
2. Name it `graisix-website` (or choose another name you prefer).
3. On GitHub Free, choose **Public** so GitHub Pages can publish the site.
4. Leave the option to add a README unchecked, then create the repository.

## 3. Upload the site files

1. In the repository, choose **Add file → Upload files**.
2. Open the extracted `GRAISIX-final` folder and drag its contents into the upload area. Upload `index.html` and the folders/files inside it; do not upload only the ZIP or an enclosing folder.
3. Keep the `assets`, `css`, `js`, and `projects` folders together at the repository root. Keep `sitemap.xml`, `robots.txt`, `README.md`, and this guide there too.
4. Add a short commit message and choose **Commit changes**.

## 4. Publish with GitHub Pages

1. In the repository, open **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch `main` and folder `/(root)`, then save.
4. Wait for the deployment to finish. GitHub will show a temporary `github.io` address. Open it and look over the homepage and all five project pages.

## 5. Connect `graisix.com`

Only do these steps if `graisix.com` is yours and you have access to its DNS manager.

1. In the repository, open **Settings → Pages**. Under **Custom domain**, enter `graisix.com` and save. For branch publishing, GitHub stores this setting in a `CNAME` file at the publishing root.
2. At your domain provider, open DNS settings and add these four **A** records for the root domain. Use `@` as the name/host if requested; some providers use a blank host field.

   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

3. Add a **CNAME** record with name `www` and value `YOUR-GITHUB-USERNAME.github.io`. Replace the example with the GitHub account name that owns the site. Do not include the repository name or `https://`.
4. Remove only conflicting website records for `@` or `www` that point to a different host. If old `AAAA`, `ALIAS`, or `ANAME` records point elsewhere, ask your DNS provider whether they conflict. **Keep email records such as MX and TXT**, because they may operate your email.
5. DNS changes can take time to appear. Return to **Settings → Pages** and wait for GitHub to confirm the domain and prepare HTTPS. Then turn on **Enforce HTTPS**.

If the domain check fails, ask the domain provider to point the root domain to the four GitHub Pages addresses above and `www` to your GitHub Pages hostname. Do not change nameservers just for this setup.

## 6. Check the site before sharing it

- Confirm the mailbox `hello@graisix.com` is active. Until then the site labels it as planned and not confirmed.
- In Formspree, confirm form ID `mkjgqjzr` belongs to you and messages reach the right inbox. The site copy has not submitted a test message.
- The privacy, terms, cookie, and refund pages are drafts. Have them reviewed and make them accurate before presenting them as final policies. They are excluded from the sitemap and marked `noindex` for now.
- Check the mobile menu, project links, contact form configuration, and the custom domain on a phone and computer.

## Official GitHub instructions

- [Choose a GitHub Pages publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Set up a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Secure a GitHub Pages site with HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
