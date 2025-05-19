import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from 'react-i18next';

import { Button } from "@renderer/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@renderer/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@renderer/components/ui/form";
import { Input } from "@renderer/components/ui/input";
import { Loader2, Plus } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "请输入项目名称"),
  description: z.string().min(1, "请输入项目描述"),
  preview_image: z.string().min(1, "请上传项目预览图"),
});

export const CreateProjectDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      name: "",
      description: "",
      preview_image: "",
    },
    resolver: zodResolver(schema),
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    await form.trigger();
    if (!form.formState.isValid) {
      return;
    }
    const values = form.getValues();
    console.log(values);
    setLoading(true);
    const { success, error, projectId } = await window.api.createProject({
      name: values.name,
      description: values.description,
      preview_image: values.preview_image,
    });
    if (success) {
      setOpen(false);
      navigate(`/projects/${projectId}`);
    } else {
      toast.error(error ?? t('project.createFailed'));
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('project.new')}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('project.form.nameLabel', 'Name')}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t('project.enterNamePlaceholder')} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('project.form.descriptionLabel', 'Description')}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t('project.enterDescriptionPlaceholder')} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preview_image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('project.form.previewImageLabel', 'Preview Image')}</FormLabel>
                  <FormControl>
                    <div className="border-border hover:border-primary relative h-40 w-full cursor-pointer rounded-md border border-dashed">
                      {field.value ? (
                        <img
                          src={field.value}
                          alt="preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div
                          className="flex h-full w-full cursor-pointer items-center justify-center"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Plus className="object-cover text-gray-400" />
                          <p className="text-gray-400">{t('project.form.clickToUpload', 'Click to upload')}</p>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              field.onChange(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setOpen(false)} className="cursor-pointer">
            {t('common.cancel', 'Cancel')}
          </Button>
          <Button disabled={loading} onClick={() => handleSubmit()} className="cursor-pointer">
            {loading ? <Loader2 className="mr-2 animate-spin" /> : null}
            {t('common.create', 'Create')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
