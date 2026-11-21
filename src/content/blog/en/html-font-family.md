---
translationId: "html-font-family"
slug: "html-font-family"
title: "HTML Font Family: List of Fonts and CSS Examples"
description: "Looking for HTML font family names? Find common fonts, copy CSS font-family code, and learn how to change fonts in HTML."
image: "/images/html-font-family.webp"
tags: ["best font for website", "HTML fonts", "css font style", "HTML font list", "font families", "css change font"]
categories: ["Typography"]
---


HTML font family refers to the typeface used to display text in a web document. In modern HTML, font selection is controlled through the CSS `font-family` property. Common font families include Arial, Helvetica, Times New Roman, Georgia, Verdana and Courier New. CSS also supports generic font categories such as serif, sans-serif, monospace, cursive and fantasy.

The `font-family` property can be applied to headings, paragraphs, lists, forms and other HTML elements. It also supports multiple font names, allowing browsers to select an available typeface when the preferred font is not installed on a device.

## List HTML Font Family 

The following table contains commonly used font families and their corresponding CSS classifications.

| Font Name | CSS Font Family | Category |
|---|---|---|
| Arial | Arial | Sans-serif |
| Helvetica | Helvetica | Sans-serif |
| Verdana | Verdana | Sans-serif |
| Tahoma | Tahoma | Sans-serif |
| Trebuchet MS | Trebuchet MS | Sans-serif |
| Times New Roman | Times New Roman | Serif |
| Georgia | Georgia | Serif |
| Garamond | Garamond | Serif |
| Cambria | Cambria | Serif |
| Courier New | Courier New | Monospace |
| Consolas | Consolas | Monospace |
| Lucida Console | Lucida Console | Monospace |
| Comic Sans MS | Comic Sans MS | Cursive |
| Brush Script MT | Brush Script MT | Cursive |
| Impact | Impact | Sans-serif |

Font availability depends on the operating system, installed software and browser environment. A typeface available on one computer may not be installed on another.

## Font Family in HTML

The CSS `font-family` property specifies the typeface used to render text within an HTML element. It accepts one or more font family names separated by commas.

The following example applies Arial to a paragraph:

```html
<p style="font-family: Arial, sans-serif;">
  This paragraph uses the Arial font family.
</p>
```

The browser first attempts to use Arial. If the font is unavailable, it selects a suitable sans-serif typeface.

The `font-family` property is defined in CSS and can be applied through inline styles, internal stylesheets or external stylesheets.

## Methods of Applying Font Family in HTML

CSS font families can be applied to HTML documents through three common methods.

### Inline CSS

Inline CSS defines font properties directly within an HTML element through the `style` attribute.

```html
<h1 style="font-family: Georgia, serif;">
  HTML Font Family
</h1>

<p style="font-family: Arial, sans-serif;">
  Example paragraph using Arial.
</p>
```

The specified font applies only to the element containing the style attribute.

### Internal CSS

Internal CSS uses a `<style>` element within the `<head>` section of an HTML document. It can define font properties for multiple elements.

```html
<!DOCTYPE html>
<html>
<head>
<style>
body {
  font-family: Arial, sans-serif;
}

h1 {
  font-family: Georgia, serif;
}

p {
  font-family: Verdana, sans-serif;
}
</style>
</head>
<body>

<h1>HTML Font Family</h1>
<p>Example paragraph using Verdana.</p>

</body>
</html>
```

CSS selectors determine which HTML elements receive the specified font family.

### External CSS

External CSS stores styling rules in a separate stylesheet. An HTML document connects to the stylesheet through a `<link>` element.

HTML:

```html
<link rel="stylesheet" href="style.css">
```

CSS (style.css):

```css
body {
  font-family: Arial, sans-serif;
}

h1 {
  font-family: Georgia, serif;
}

p {
  font-family: Verdana, sans-serif;
}
```

External stylesheets allow the same font definitions to be used across multiple HTML pages.

## Generic Font Family Categories in CSS

CSS defines five generic font family categories: serif, sans-serif, monospace, cursive and fantasy. These categories describe broad characteristics of typefaces rather than individual font names.

### Serif

Serif typefaces contain small finishing strokes, known as serifs, at the ends of letter strokes. Georgia and Times New Roman are examples of serif fonts.

```css
body {
  font-family: Georgia, serif;
}
```

### Sans-Serif

Sans-serif typefaces do not contain the small finishing strokes found in serif fonts. Arial, Helvetica and Verdana are examples.

```css
body {
  font-family: Arial, sans-serif;
}
```

### Monospace

Monospace typefaces allocate the same horizontal character space to each glyph. They are commonly used for programming code and terminal text.

Courier New, Consolas and Lucida Console are examples.

```css
code {
  font-family: "Courier New", monospace;
}
```

### Cursive

Cursive typefaces have letterforms associated with handwriting or connected writing styles. Their appearance varies across operating systems and available fonts.

```css
h1 {
  font-family: "Brush Script MT", cursive;
}
```

### Fantasy

Fantasy is a generic font category for decorative typefaces that do not fit neatly into the other generic categories.

```css
h1 {
  font-family: fantasy;
}
```

## Multiple Font Families and Fallback Fonts

CSS allows multiple font family names to be specified in a single declaration. The browser checks the list in order and selects the first available font.

```css
body {
  font-family: Arial, Helvetica, sans-serif;
}
```

In this example, Arial is the preferred font, followed by Helvetica. The generic sans-serif category provides another option if neither named font is available.

This arrangement is known as a font stack or fallback font stack. It helps maintain consistent typography across different operating systems and devices.

## Google Fonts in HTML

Google Fonts is a web font service that provides typefaces for use in websites and applications. Its font library includes families such as Roboto, Open Sans, Montserrat and Lato.

Web fonts can be loaded through stylesheet links or other supported CSS methods.

For example, the following HTML code imports the Roboto font:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
```

The imported typeface can then be assigned through CSS:

```css
body {
  font-family: "Roboto", sans-serif;
}
```

The browser downloads the requested font resources when the stylesheet is loaded. Font availability and rendering depend on network access, browser support and the selected font files.

The official font library is available at [Google Fonts](https://fonts.google.com/).

## CSS Properties Related to Font Family

The CSS font system includes several properties that control the appearance and spacing of text.

| CSS Property | Description |
|---|---|
| `font-family` | Specifies the typeface |
| `font-size` | Defines the size of text |
| `font-weight` | Specifies the thickness of characters |
| `font-style` | Defines normal, italic or oblique text |
| `font-variant` | Controls alternative character forms |
| `line-height` | Sets the height of a line box |
| `letter-spacing` | Controls spacing between characters |

These properties can be combined within a single CSS rule.

```css
p {
  font-family: Arial, sans-serif;
  font-size: 16px;
  font-weight: 400;
  font-style: normal;
  line-height: 1.6;
  letter-spacing: 0;
}
```

In this example, the paragraph uses Arial at 16 pixels with normal font weight and line spacing of 1.6.

## Deprecated HTML Font Tag

Earlier versions of HTML included the `<font>` element for specifying text colour, size and typeface. This element is obsolete in HTML5 and is not recommended for modern web development.

Older HTML code may contain:

```html
<font face="Arial">
  Example text
</font>
```

The equivalent modern approach uses CSS:

```html
<p style="font-family: Arial, sans-serif;">
  Example text
</p>
```

CSS separates presentation from document structure and provides more control over typography across a website.

## Conclusion

The CSS `font-family` property defines the typeface used in HTML documents. It supports named font families, generic categories and fallback font lists. Web developers can also load external typefaces through services such as Google Fonts. The availability of fonts, fallback settings and CSS styling determine how text is rendered across different browsers and operating systems.
