<p align="center">
  <a href="https://corsmirror.com/">
    <img src="https://github.com/CORSmirror.png?size=300" alt="CORSmirror">
  </a>
</p>

CORSmirror is a RESTful API that provides a proxy to URLs with [CORS](https://developer.mozilla.org/docs/Web/HTTP/CORS) enabled.

Built with:

- [Cloudflare Pages](https://developers.cloudflare.com/pages/)

## Usage

RESTful API:

```
https://corsmirror.com/v1?url=<url>
```

> Replace `<url>` with your URL.

So to [fetch](https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch) [`http://example.com`](http://example.com):

```js
fetch('https://corsmirror.com/v1?url=http://example.com')
  .then((response) => response.text())
  .then((data) => console.log(data));
```

Try it out: https://corsmirror.com/v1?url=http://example.com

## Development

### Installation

Clone the repository:

```sh
git clone https://github.com/CORSmirror/corsmirror-cf.git
cd corsmirror-cf
```

Install the dependencies:

```sh
npm install
```

### Run

Start the development server:

```sh
npm start
```

Open [http://127.0.0.1:8787](http://127.0.0.1:8787) to view it in the browser:

```sh
open http://127.0.0.1:8787
```

## Contributions

This is an open source project so feel free to fork the [repository](https://github.com/CORSmirror/corsmirror-cf/fork). Contributions are welcome!

## Support

- [GitHub Sponsors](https://b.remarkabl.org/github-sponsors)
- [Patreon](https://b.remarkabl.org/patreon)
- [Ko-fi](https://b.remarkabl.org/ko-fi)
- [Liberapay](https://b.remarkabl.org/liberapay)
- [Teespring](https://b.remarkabl.org/teespring)

## License

[MIT](https://github.com/CORSmirror/corsmirror-cf/blob/master/LICENSE)
