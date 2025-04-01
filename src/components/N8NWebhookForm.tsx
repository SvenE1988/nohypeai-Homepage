
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const applicationFormSchema = z.object({
  name: z.string().min(2, { message: "Name muss mindestens 2 Zeichen haben" }),
  email: z.string().email({ message: "Ungültige E-Mail-Adresse" }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: "Nachricht muss mindestens 10 Zeichen haben" }),
  resume: z.instanceof(File).optional()
    .refine(file => file ? file.size <= MAX_FILE_SIZE : true, 
             { message: "Datei darf nicht größer als 10MB sein" })
});

type ApplicationFormValues = z.infer<typeof applicationFormSchema>;

interface N8NWebhookFormProps {
  webhookUrl: string;
  jobTitle?: string;
  isApplication?: boolean;
  onSubmitSuccess: () => void;
  isUploading: boolean;
  setIsUploading: (value: boolean) => void;
}

const N8NWebhookForm = ({ 
  webhookUrl,
  jobTitle, 
  isApplication = false,
  onSubmitSuccess,
  isUploading,
  setIsUploading
}: N8NWebhookFormProps) => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      form.setValue('resume', file);
    }
  };

  const onSubmit = async (data: ApplicationFormValues) => {
    setIsUploading(true);
    
    try {
      // Erstellen der FormData-Instanz für Dateiupload
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      if (data.phone) formData.append("phone", data.phone);
      formData.append("message", data.message);
      formData.append("formType", isApplication ? "application" : "contact");
      if (jobTitle) formData.append("jobTitle", jobTitle);
      
      // Anhängen der Datei, wenn vorhanden
      if (selectedFile) {
        formData.append("resume", selectedFile);
      }

      // Senden der Daten an den N8N-Webhook
      const response = await fetch(webhookUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast({
          title: "Erfolgreich gesendet!",
          description: isApplication 
            ? "Vielen Dank für Ihre Bewerbung. Wir werden uns in Kürze bei Ihnen melden." 
            : "Vielen Dank für Ihre Nachricht. Wir werden uns in Kürze bei Ihnen melden.",
        });
        onSubmitSuccess();
      } else {
        throw new Error("Fehler beim Senden des Formulars");
      }
    } catch (error) {
      console.error("Formular-Übermittlungsfehler:", error);
      toast({
        title: "Fehler beim Senden",
        description: "Es gab ein Problem bei der Übermittlung. Bitte versuchen Sie es später erneut.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Ihr Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-Mail</FormLabel>
              <FormControl>
                <Input placeholder="ihre-email@beispiel.de" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefon (optional)</FormLabel>
              <FormControl>
                <Input placeholder="+49 123 456789" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {isApplication && (
          <div className="space-y-2">
            <FormLabel>Lebenslauf hochladen</FormLabel>
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
            />
            <p className="text-xs text-white/60">Akzeptierte Formate: PDF, DOC, DOCX (max. 10MB)</p>
          </div>
        )}
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{isApplication ? "Anschreiben" : "Nachricht"}</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={isApplication ? "Ihr Anschreiben..." : "Ihre Nachricht..."} 
                  className="min-h-[120px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Wird gesendet...
            </>
          ) : (
            isApplication ? "Bewerbung absenden" : "Nachricht senden"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default N8NWebhookForm;
