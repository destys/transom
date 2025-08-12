import { API_URL, EMAIL_RECIPIENT } from "@/constants";

type EmailFormValues = {
  username?: string;
  phone: string;
  files?: File;
};

export const sendEmail = async (values: EmailFormValues): Promise<void> => {
  let uploadedFileUrl = null;

  // 1. Загружаем файл, если он есть
  if (values.files) {
    const formData = new FormData();
    formData.append("files", values.files);

    const uploadRes = await fetch(`${API_URL}/api/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
      body: formData,
    });

    const uploadData = await uploadRes.json();

    if (!uploadRes.ok || !uploadData || !uploadData[0]) {
      throw new Error("Ошибка загрузки файла");
    }

    uploadedFileUrl = uploadData[0].url
      ? `${API_URL}${uploadData[0].url}`
      : null;
  }

  // 2. Формируем HTML-содержимое письма
  const htmlContent = `
      <p><strong>Имя: </strong>${values.username || "Не указано"}</p>
      <p><strong>Телефон: </strong>${values.phone || "Не указано"}</p>
      ${
        uploadedFileUrl
          ? `<p><strong>Фото: </strong><a href="${uploadedFileUrl}">${uploadedFileUrl}</a></p>`
          : ""
      }
    `;

  // 3. Отправляем письмо
  const emailPayload = {
    to: EMAIL_RECIPIENT,
    replyTo: "noreply@example.com",
    subject: "Новая заявка с сайта",
    html: htmlContent,
  };

  const emailRes = await fetch(`${API_URL}/api/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
    body: JSON.stringify(emailPayload),
  });

  if (!emailRes.ok) {
    throw new Error("Ошибка отправки письма");
  }
};
