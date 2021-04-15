// Element selection utils
export const q = (query) => document.querySelector(query);

export const qA = (query) => document.querySelectorAll(query);

export const id = (htmlElId) => document.getElementById(htmlElId);

export const cn = (className) => document.getElementsByClassName(className);

// Element manipulation utils
// apply function used for operating on node lists if node lists passed
const apply = (htmlElements, func, ...funcParams) => {
  if (htmlElements.length > 1) {
    [...htmlElements].forEach((htmlEl) => func(htmlEl, ...funcParams));
  } else {
    func(htmlElements, ...funcParams);
  }
};

export const hide = (htmlEl) => {
  apply(htmlEl, (element) => {
    element.hidden = true;
  });
};

export const unhide = (htmlEl) => {
  apply(htmlEl, (element) => {
    element.hidden = false;
  });
};

export const clear = (htmlEl) => {
  apply(htmlEl, (element) => {
    element.textContent = '';
  });
};

export const remove = (htmlEl) => {
  apply(htmlEl, (element) => {
    element.parentNode.removeChild(element);
  });
};

export const clAdd = (htmlEl, htmlElClass) => {
  apply(
    htmlEl,
    (element, elClass) => {
      elClass = elClass.split(' ');
      element.classList.add(...elClass);
    },
    htmlElClass
  );
};

export const clRm = (htmlEl, htmlElClass) => {
  apply(
    htmlEl,
    (element, elClass) => {
      elClass = elClass.split(' ');
      element.classList.remove(...elClass);
    },
    htmlElClass
  );
};

export const clRp = (htmlEl, htmlElCl1, htmlElCl2) => {
  apply(
    htmlEl,
    (element, elCl1, elCl2) => {
      element.classList.replace(elCl1, elCl2);
    },
    htmlElCl1,
    htmlElCl2
  );
};

export const setText = (htmlEl, text) => {
  apply(
    htmlEl,
    (element, elText) => {
      element.textContent = elText;
    },
    text
  );
};

export const setImg = (htmlImgEl, htmlImgSrc, htmlImgAlt = htmlImgEl.alt) => {
  apply(
    htmlImgEl,
    (imgElement, imgSrc, imgAlt = imgElement.alt) => {
      imgElement.src = imgSrc;
      imgElement.alt = imgAlt;
    },
    htmlImgSrc,
    htmlImgAlt
  );
};

export const setAttr = (htmlEl, htmlElAttr, htmlElAttrVal) => {
  apply(
    htmlEl,
    (element, elAttr, elAttrVal) => {
      element[elAttr] = elAttrVal;
    },
    htmlElAttr,
    htmlElAttrVal
  );
};

// Element creation utils
export function el(tag, htmlElClass, htmlElId) {
  const htmlEl = document.createElement(tag);
  if (htmlElClass && typeof htmlElClass === 'string') {
    clAdd(htmlEl, htmlElClass);
  }
  if (htmlElId) {
    htmlEl.id = htmlElId;
  }
  return htmlEl;
}

export function textEl(tag, txt, htmlElClass, htmlElId) {
  const htmlEl = el(tag, htmlElClass, htmlElId);
  htmlEl.textContent = txt;
  return htmlEl;
}

export function imgEl(src, alt, htmlElClass, htmlElId) {
  const img = el('img', htmlElClass, htmlElId);
  img.setAttribute('src', src);
  img.setAttribute('alt', alt);
  return img;
}

export function linkEl(href, target, text, elClass) {
  const element = document.createElement("a")
  element.href = href
  if (target) element.target = target
  if (text) element.textContent = text
  if (elClass) clAdd(element, elClass)
  return element
}

export const generate = (
  htmlElAmount,
  htmlElGenFunc,
  htmlElGenFuncParams,
  htmlContainerEl = document.body
) => {
  apply(
    htmlContainerEl,
    (containerEl = document.body, elAmount, elGenFunc, elGenFuncParams) => {
      Array(elAmount)
        .fill(1)
        .forEach(() => containerEl.append(elGenFunc(...elGenFuncParams)));
    },
    htmlElAmount,
    htmlElGenFunc,
    htmlElGenFuncParams
  );
};

export const copy = (htmlEl, htmlContainerEl = htmlEl.parentNode) => {
  apply(
    htmlEl,
    (element, containerEl = element.parentNode) => {
      const copiedEl = element.cloneNode(true);
      containerEl.append(copiedEl);
    },
    htmlContainerEl
  );
};
