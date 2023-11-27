import React from "react";
import { RawHTMLProps } from "../MasonryToDo/MasonryToDo";
const DOMPurify = require('DOMPurify');


const RawHTML: React.FC<RawHTMLProps> = ({ dirtyHTML }) => {
  // Создаем "чистый" объект document
  const doc = new DOMParser().parseFromString("", "text/html");

  // Вставляем "грязный" HTML в объект document
  const sanitizedHTML = dirtyHTML.split("\n").join('<br/>').split("\t").join('   ');
  doc.body.innerHTML = sanitizedHTML;

  // Используем DOMPurify для очистки HTML от потенциально опасных элементов и атрибутов
  const cleanHTML = DOMPurify.sanitize(doc.body.innerHTML);

  return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
};

export default RawHTML;