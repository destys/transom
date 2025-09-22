"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DialogTitle } from "@radix-ui/react-dialog";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type OpenOptions = {
  /** Любой контент модалки */
  content: ReactNode;
  /** Класс для управления максимальной шириной, напр. "sm:max-w-md", "sm:max-w-xl", "sm:max-w-2xl" */
  maxWidth?: string;
  /** Запретить закрытие по клику на оверлей/ESC (например, во время сабмита) */
  preventClose?: boolean;
  /** Коллбек после закрытия */
  onClose?: () => void;
  /** Доп. классы к DialogContent */
  className?: string;
};

type ModalCtx = {
  openModal: (opts: OpenOptions) => void;
  closeModal: () => void;
  /** обновить контент/параметры, не закрывая модалку */
  updateModal: (opts: Partial<OpenOptions>) => void;
  isOpen: boolean;
};

const Ctx = createContext<ModalCtx | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [opts, setOpts] = useState<OpenOptions | null>(null);

  const openModal = useCallback((next: OpenOptions) => {
    setOpts(next);
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
    // вызовем onClose после анимации закрытия (микротаск)
    queueMicrotask(() => opts?.onClose?.());
    setOpts(null);
  }, [opts]);

  const updateModal = useCallback((next: Partial<OpenOptions>) => {
    setOpts((prev) => (prev ? { ...prev, ...next } : prev));
  }, []);

  const value = useMemo<ModalCtx>(
    () => ({ openModal, closeModal, updateModal, isOpen }),
    [openModal, closeModal, updateModal, isOpen]
  );

  return (
    <Ctx.Provider value={value}>
      {children}

      <Dialog
        open={isOpen}
        onOpenChange={(o) => {
          if (!o && opts?.preventClose) return;
          setOpen(o);
          if (!o) queueMicrotask(() => opts?.onClose?.());
          if (!o) setOpts(null);
        }}
      >
        <DialogTitle />
        <DialogContent
          className={cn(
            // базовая ширина shadcn, переопределяем maxWidth через проп
            "sm:max-w-xl",
            opts?.maxWidth,
            opts?.className
          )}
          onInteractOutside={(e) => {
            if (opts?.preventClose) e.preventDefault();
          }}
          onEscapeKeyDown={(e) => {
            if (opts?.preventClose) e.preventDefault();
          }}
        >
          {opts?.content}
        </DialogContent>
      </Dialog>
    </Ctx.Provider>
  );
}

export function useSimpleModal() {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error("useSimpleModal must be used within <ModalProvider>");
  return ctx;
}
