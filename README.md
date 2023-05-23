<p align="center">
  <a href="https://corsmirror.pages.dev/">
    <img src="https://github.com/CORSmirror.png?size=300" alt="CORSmirror">
  </a>
</p>

CORSmirror is a RESTful API that provides a proxy to URLs with [CORS](https://developer.mozilla.org/docs/Web/HTTP/CORS) enabled.

Built with:

- [Cloudflare Pages](https://developers.cloudflare.com/pages/)

## Usage

RESTful API:

```
https://corsmirror.pages.dev/v1?url=<url>
```

> Replace `<url>` with your URL.

So to [fetch](https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch) [`http://example.com`](http://example.com):

```js
fetch('https://corsmirror.pages.dev/v1?url=http://example.com')
  .then((response) => response.text())
  .then((data) => console.log(data));
```

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

Open [http://127.0.0.1:8788](http://127.0.0.1:8788) to view it in the browser:

```sh
open http://127.0.0.1:8788
```

## Contributions

This is an open source project so feel free to fork the [repository](https://github.com/CORSmirror/corsmirror-cf/fork). Contributions are welcome!

## License

[MIT](https://github.com/CORSmirror/corsmirror-cf/blob/master/LICENSE)
