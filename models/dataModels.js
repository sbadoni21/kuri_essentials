
export const routineModel = {
  title: { type: "string" },
  description: { type: "string" },
  heroImage: { type: "string" },
};
export const bigHighlightedLineModel = {
  type: "bigHighlightedLine",
  name: "Big Highlighted Line",
  color: { type: "string" },
  content: { type: "string" },
};

export const highlightedItalicLine = {
  type: "highlightedItalicLine",
  name: "Highlighted Italic Line",
  color: { type: "string" },
  content: { type: "string" },
};
export const paragraphModel = {
  type: "paragraph",
  name: "Paragraph",
  content: { type: "string" },
};
export const highlightedParagraphModel = {
  type: "highlightedParagraph",
  name: "Highlighted Paragraph",
  color: { type: "string" },
  content: { type: "string" },
};
export const mediumLineModel = {
  type: "mediumLine",
  name: "Medium Line",
  content: { type: "string" },
};
export const smallLineModel = {
  type: "smallLine",
  name: "Small Line",
  content: { type: "string" },
};
export const largeLineModel = {
  type: "largeLine",
  name: "Large Line",
  content: { type: "string" },
};
export const largeBoldfontModel = {
  type: "largeBoldfontModel",
  name: "Large Bold Font Line",
  content: { type: "string" },
};
export const mediumBoldfontModel = {
  type: "mediumBoldfontModel",
  name: "Medium Bold Font Line",
  content: { type: "string" },
};
export const smallBoldfontModel = {
  type: "smallBoldfontModel",
  name: "Small Bold Font Line",
  content: { type: "string" },
};


export const largeItalicBoldfontModel = {
  type: "largeItalicBoldfontModel",
  name: "Large Italic Bold Font Line",
  content: { type: "string" },
};
export const mediumItalicBoldfontModel = {
  type: "mediumItalicBoldfontModel",
  name: "Medium Italic Bold Font Line",
  content: { type: "string" },
};
export const smallItalicBoldfontModel = {
  type: "smallItalicBoldfontModel",
  name: "Small Italic Bold Font Line",
  content: { type: "string" },
};

export const smallItalicLineModel = {
  name: "Small Italic Line",
  type: "smallItalicLine",
  content: { type: "string" },
};
export const mediumItalicLineModel = {
  name: "Medium Italic Line",
 type: "mediumItalicLine",
  content: { type: "string" },
};
export const largeItalicLineModel = {
  type: "largeItalicLine",
  name: "Large Italic Line",
  content: { type: "string" },
};
export const space10Model = {
  type: "space10",
  name :"Space 10"
};
export const space20Model = {
  type: "space20",
  name :"Space 20"
};
export const space30Model = {
  type: "space30",
  name :"Space 30"
};
export const boldLine = {
  type: "bold Line",
  name :"Bold Line"
};
export const quoteModel = {
  type: "quote",
  name: "Quote",
  text: { type: "string" },
  author: { type: "string" },
};
export const captionModel = {
  type: "caption",
  name: "Caption",
  text: { type: "string" },
};
export const headingModel = {
  type: "heading",
  name: "Heading",
  text: { type: "string" },
};
export const tagModel = {
  type: "tag",
  name: "Tag",
  text: { type: "string" },
};

export const listItemModel = {
  type: "listItem",
  name: "List Item",
  text: { type: "string" },
};

export const codeBlockModel = {
  type: "codeBlock",
  name: "Code Block",
  code: { type: "string" },

};

export const horizontalRuleModel = {
  type: "horizontalRule",
  name: "Horizontal Rule",
};
export const imageModel = {
  type: "image",
  name: "Image",
  url: { type: "string" },
  altText: { type: "string" },
};

export const videoModel = {
  type: "video",
  name: "Video",
  url: { type: "string" },
};

export const audioModel = {
  type: "audio",
  name: "Audio",
  url: { type: "string" },
};

export const linkModel = {
  type: "link",
  name: "Link",
  url: { type: "string" },
  text: { type: "string" },
};

export const buttonModel = {
  type: "button",
  name: "Button",
  text: { type: "string" },
  url: { type: "string" },
};

export const checkboxModel = {
  type: "checkbox",
  name: "Checkbox",
  label: { type: "string" },
  checked: { type: "boolean" },
};

export const radioModel = {
  type: "radio",
  name: "Radio",
  label: { type: "string" },
  options: { type: "array" },
  selectedOption: { type: "string" },
};

export const dropdownModel = {
  type: "dropdown",
  name: "Dropdown",
  label: { type: "string" },
  options: { type: "array" },
  selectedOption: { type: "string" },
};

export const datePickerModel = {
  type: "datePicker",
  name: "Date Picker",
  label: { type: "string" },
  selectedDate: { type: "string" },
};

export const timePickerModel = {
  type: "timePicker",
  name: "Time Picker",
  label: { type: "string" },
  selectedTime: { type: "string" },
};

export const fileUploadModel = {
  type: "fileUpload",
  name: "File Upload",
  label: { type: "string" },
  acceptedFormats: { type: "array" },
  uploadedFile: { type: "string" },
};
 