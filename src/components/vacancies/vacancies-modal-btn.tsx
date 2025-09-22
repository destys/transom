"use client";

import { VacancyFormModal } from "../modals/vacancy-form-modal";
import { SuccessModal } from "../modals/success-modal";

import { useSimpleModal } from "@/providers/modal-provider";
import { Button } from "@/components/ui/button";

interface Props {
  className?: string;
  variant?:
    | "default"
    | "defaultFilled"
    | "secondary"
    | "secondaryFilled"
    | null
    | undefined;
  text: string;
}

export function VacanciesModalBtn({
  className,
  variant = "default",
  text,
}: Props) {
  const { openModal, updateModal } = useSimpleModal();

  const openContact = () => {
    openModal({
      maxWidth: "sm:max-w-xl", // здесь задаёшь ширину модалки
      content: (
        <VacancyFormModal
          onSuccess={() => {
            // показываем success, не закрывая модалку
            updateModal({
              maxWidth: "sm:max-w-sm",
              content: <SuccessModal />,
            });
          }}
        />
      ),
    });
  };

  return (
    <Button onClick={openContact} variant={variant} className={className}>
      {text}
    </Button>
  );
}
