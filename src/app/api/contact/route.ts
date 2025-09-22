import { NextResponse } from "next/server";

import { API_URL, EMAIL_RECIPIENT } from "@/constants";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const STRAPI_TOKEN = process.env.STRAPI_TOKEN!;

    if (!API_URL || !STRAPI_TOKEN || !EMAIL_RECIPIENT) {
      return NextResponse.json(
        { error: "Server env is not configured" },
        { status: 500 }
      );
    }

    // === 1. Читаем только phone ===
    let phone = "";
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const json = await req.json().catch(() => ({}));
      phone = String(json?.phone ?? "");
    } else if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      phone = String(form.get("phone") ?? "");
    } else {
      const text = await req.text();
      phone = text.trim();
    }

    if (!phone) {
      return NextResponse.json({ error: "Phone is required" }, { status: 400 });
    }

    // === 2. Создаём Order в Strapi ===
    const orderRes = await fetch(`${API_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      body: JSON.stringify({
        data: { phone }, // orders schema: только phone
      }),
    });

    const orderData = await orderRes.json().catch(() => ({}));
    if (!orderRes.ok) {
      console.error("Order create error:", orderRes.status, orderData);
      return NextResponse.json(
        { error: "Order create failed" },
        { status: 502 }
      );
    }

    // === 3. Отправляем письмо ===
    const html = `
      <p><strong>Новая заявка</strong></p>
      <p><strong>Телефон:</strong> ${phone}</p>
      <p><strong>ID заказа:</strong> ${orderData.data?.id ?? "неизвестно"}</p>
    `;

    const emailPayload = {
      to: EMAIL_RECIPIENT,
      subject: "Новая заявка с сайта",
      html,
      replyTo: "noreply@example.com",
    };

    const emailRes = await fetch(`${API_URL}/api/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      body: JSON.stringify(emailPayload),
    });

    const emailData = await emailRes.json().catch(() => ({}));
    if (!emailRes.ok) {
      console.error("Email error:", emailRes.status, emailData);
      return NextResponse.json({ error: "Email send failed" }, { status: 502 });
    }

    return NextResponse.json({
      ok: true,
      orderId: orderData.data?.id,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
