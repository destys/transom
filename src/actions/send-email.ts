export type EmailFormValues = {
  phone: string;
  username?: string;
  file?: File | null;
};

export const sendEmail = async ({ phone, username, file }: EmailFormValues) => {
  const fd = new FormData();
  fd.append("phone", phone);
  if (username) fd.append("username", username);
  if (file) fd.append("files", file, file.name);

  const res = await fetch("/api/contact", {
    method: "POST",
    body: fd,
  });

  let data: any = null;
  try {
    data = await res.json();
  } catch {
    data = {};
  }

  if (!res.ok) {
    throw new Error(data?.error || "Ошибка отправки");
  }

  return data; // ⚡ теперь вернём результат на клиент
};
