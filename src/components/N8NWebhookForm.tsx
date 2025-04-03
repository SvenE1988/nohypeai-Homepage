
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

const applicationFormSchema = z.object({
  name: z.string().min(2, { message: "Name muss mindestens 2 Zeichen haben" }),
  email: z.string().email({ message: "Ungültige E-Mail-Adresse" }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: "Nachricht muss mindestens 10 Zeichen haben" }),
  resume: z.instanceof(File).optional()
    .refine(file => file ? file.size <= MAX_FILE_SIZE : true, 
             { message: "Datei darf nicht größer als 10MB sein" })
    .refine(file => file ? ACCEPTED_FILE_TYPES.includes(file.type) : true,
             { message: "Nur PDF, DOC oder DOCX Dateien sind erlaubt" })
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
  const [formError, setFormError] = useState<string | null>(null);

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
      
      // Client-side validation for file type and size
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        toast({
          title: "Ungültiger Dateityp",
          description: "Bitte laden Sie nur PDF, DOC oder DOCX Dateien hoch.",
          variant: "destructive",
        });
        e.target.value = '';
        return;
      }
      
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "Datei zu groß",
          description: "Die Datei darf nicht größer als 10MB sein.",
          variant: "destructive",
        });
        e.target.value = '';
        return;
      }
      
      setSelectedFile(file);
      form.setValue('resume', file);
    }
  };

  const onSubmit = async (data: ApplicationFormValues) => {
    setFormError(null);
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
        form.reset();
        setSelectedFile(null);
        onSubmitSuccess();
      } else {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Fehler beim Senden des Formulars");
      }
    } catch (error) {
      console.error("Formular-Übermittlungsfehler:", error);
      setFormError(error instanceof Error ? error.message : "Es gab ein Problem bei der Übermittlung. Bitte versuchen Sie es später erneut.");
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
        {formError && (
          <Alert variant="destructive" className="bg-red-900/30 border-red-800">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        )}
        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Ihr Name" 
                  {...field} 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary focus:ring-1 focus:ring-primary" 
                  aria-required="true"
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">E-Mail</FormLabel>
              <FormControl>
                <Input 
                  placeholder="ihre-email@beispiel.de" 
                  {...field} 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary focus:ring-1 focus:ring-primary" 
                  aria-required="true"
                  type="email"
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Telefon (optional)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="+49 123 456789" 
                  {...field} 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary focus:ring-1 focus:ring-primary" 
                  type="tel"
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        
        {isApplication && (
          <div className="space-y-2">
            <FormLabel className="text-white">Lebenslauf hochladen</FormLabel>
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="bg-white/10 border-white/20 text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-primary/20 file:text-white hover:file:bg-primary/30 cursor-pointer"
              aria-describedby="file-upload-description"
            />
            <p id="file-upload-description" className="text-xs text-white/60">Akzeptierte Formate: PDF, DOC, DOCX (max. 10MB)</p>
            {selectedFile && (
              <p className="text-xs text-green-400 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
                {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
              </p>
            )}
          </div>
        )}
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">{isApplication ? "Anschreiben" : "Nachricht"}</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={isApplication ? "Ihr Anschreiben..." : "Ihre Nachricht..."} 
                  className="min-h-[120px] bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary focus:ring-1 focus:ring-primary" 
                  {...field} 
                  aria-required="true"
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary/90 text-white transition-all duration-300" 
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
