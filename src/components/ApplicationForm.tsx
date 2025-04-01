
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, CheckCircle2, XCircle, Paperclip } from "lucide-react";

interface ApplicationFormProps {
  jobTitle?: string;
  onSubmitSuccess?: () => void;
}

const ApplicationForm = ({ jobTitle, onSubmitSuccess }: ApplicationFormProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [fileErrors, setFileErrors] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    
    const newFiles: File[] = [];
    const newErrors: string[] = [];
    
    Array.from(e.target.files).forEach(file => {
      // Prüfe Dateigröße (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        newErrors.push(`${file.name} ist zu groß (maximal 5MB)`);
        return;
      }
      
      // Prüfe Dateityp (PDF, DOC, DOCX)
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        newErrors.push(`${file.name} hat ein ungültiges Format (nur PDF, DOC, DOCX)`);
        return;
      }
      
      newFiles.push(file);
    });
    
    setFiles(prev => [...prev, ...newFiles]);
    setFileErrors(newErrors);
    
    // Setze den Dateiwert zurück, damit dasselbe File erneut ausgewählt werden kann
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Hier würde normalerweise die API-Anfrage stattfinden
    // FormData erstellen und an Server senden
    const submissionData = new FormData();
    submissionData.append("name", formData.name);
    submissionData.append("email", formData.email);
    submissionData.append("phone", formData.phone);
    submissionData.append("message", formData.message);
    if (jobTitle) {
      submissionData.append("jobTitle", jobTitle);
    }
    
    files.forEach(file => {
      submissionData.append("files", file);
    });
    
    // Simuliere einen API-Aufruf
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Bewerbung gesendet",
        description: "Wir werden uns schnellstmöglich bei Ihnen melden.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
      setFiles([]);
      if (onSubmitSuccess) onSubmitSuccess();
    }, 1500);

    // Echter API-Aufruf würde hier implementiert werden
    // try {
    //   const response = await fetch('/api/apply', {
    //     method: 'POST',
    //     body: submissionData,
    //   });
    //   if (!response.ok) throw new Error('Fehler beim Senden');
    //   
    //   setIsSubmitting(false);
    //   toast({
    //     title: "Bewerbung gesendet",
    //     description: "Wir werden uns schnellstmöglich bei Ihnen melden."
    //   });
    //   setFormData({ name: "", email: "", phone: "", message: "" });
    //   setFiles([]);
    //   if (onSubmitSuccess) onSubmitSuccess();
    // } catch (error) {
    //   setIsSubmitting(false);
    //   toast({
    //     title: "Fehler",
    //     description: "Ihre Bewerbung konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.",
    //     variant: "destructive"
    //   });
    // }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name" className="text-sm font-medium text-gray-200">
          Name
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="bg-white/5 border-white/10 text-white"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="email" className="text-sm font-medium text-gray-200">
          E-Mail
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="bg-white/5 border-white/10 text-white"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="phone" className="text-sm font-medium text-gray-200">
          Telefon
        </Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="bg-white/5 border-white/10 text-white"
        />
      </div>
      
      <div>
        <Label htmlFor="message" className="text-sm font-medium text-gray-200">
          Nachricht
        </Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="bg-white/5 border-white/10 text-white min-h-[100px]"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-200">
          Anhänge (Lebenslauf, Anschreiben)
        </Label>
        
        <div className="flex items-center gap-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => fileInputRef.current?.click()}
            className="border-dashed border-white/20 bg-white/5 hover:bg-white/10 w-full flex items-center justify-center gap-2"
          >
            <Upload size={16} />
            Dateien hochladen
          </Button>
          <Input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            multiple
          />
        </div>
        
        {fileErrors.length > 0 && (
          <div className="text-red-400 text-sm mt-2">
            {fileErrors.map((error, i) => (
              <div key={i} className="flex items-center gap-1">
                <XCircle size={14} />
                <span>{error}</span>
              </div>
            ))}
          </div>
        )}
        
        {files.length > 0 && (
          <div className="mt-3 space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-white/5 p-2 rounded-md">
                <div className="flex items-center gap-2 text-sm">
                  <Paperclip size={14} className="text-primary" />
                  <span className="truncate max-w-[180px]">{file.name}</span>
                  <span className="text-white/40 text-xs">
                    {(file.size / 1024).toFixed(0)} KB
                  </span>
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0 text-white/60 hover:text-white/90"
                  onClick={() => removeFile(index)}
                >
                  <XCircle size={16} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Wird gesendet..." : "Bewerbung absenden"}
      </Button>
    </form>
  );
};

export default ApplicationForm;
