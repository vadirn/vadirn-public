To convert otf font to woff run:

```
docker build -t font-converter .
docker run --rm -it -v ./src/assets/fonts:/fonts font-converter
```

You'll get into bash, where you can run:

```
sfnt2woff literata_regular.otf
woff2_compress literata_regular.otf
```