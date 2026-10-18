# Marker website fonts

These files are served from the website itself. No visitor request to Google Fonts
or another font provider is required.

| File | Family | Coverage | Weight axis |
| --- | --- | --- | --- |
| `inter-latin-variable.woff2` | Inter 4.001 | Google Fonts Latin subset | 100–900 |
| `noto-sans-sc-subset-variable.woff2` | Noto Sans SC 2.004 | Website Chinese text and common interface terms | 100–900 |

Both families use the SIL Open Font License 1.1. The unmodified license texts are
included as `Inter-OFL.txt` and `NotoSansSC-OFL.txt`.

Official upstreams:

- [Inter](https://github.com/rsms/inter)
- [Inter on Google Fonts](https://github.com/google/fonts/tree/main/ofl/inter)
- [Noto Sans SC on Google Fonts](https://github.com/google/fonts/tree/main/ofl/notosanssc)

The WOFF2 files were fetched from the official Google Fonts CSS API and its
`fonts.gstatic.com` asset host on 2026-10-18. `sources.json` records the exact
downloaded asset URLs and byte sizes. `subset-characters.txt` records every
requested Chinese character and punctuation mark in the Noto Sans SC subset.

## CSS

```css
@font-face {
  font-family: 'Inter';
  src: url('./assets/fonts/inter-latin-variable.woff2') format('woff2');
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
}

@font-face {
  font-family: 'Noto Sans SC';
  src: url('./assets/fonts/noto-sans-sc-subset-variable.woff2') format('woff2');
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
}

body {
  font-family: 'Inter', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}
```

The CSS paths above assume the stylesheet is at the website root. New Chinese
characters outside the subset use the system fallbacks. Regenerate the subset
when adding website copy by requesting
`https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100..900&display=swap&text=…`
with the URL-encoded, deduplicated character list. Use a modern browser user agent
to receive WOFF2, download the returned official asset URL, and update the character
manifest and provenance record together.
