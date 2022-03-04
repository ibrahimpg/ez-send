const brandColor = process.env.BRAND_COLOR;
const layoutOpening = '<div style="display: flex; justify-content: center">';
const layoutClosing = '</div>';
const cardOpening = `<div style="border-top: 5px solid ${brandColor}">`;
const cardClosing = '</div>';

export default (title: string, body: string, link?: [string, string]) => {
  if (!link) {
    return `${layoutOpening}${cardOpening}${title}${body}${cardClosing}${layoutClosing}`;
  }
  return `${layoutOpening}${cardOpening}${title}${body}<a href="${link[0]}">${link[1]}</a>${cardClosing}${layoutClosing}`;
};
