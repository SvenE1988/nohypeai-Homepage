
import React from "react";
import N8NWebhookForm from "./N8NWebhookForm";
import { useDialog } from "./providers/DialogProvider";

interface ApplicationFormProps {
  jobTitle?: string;
  isApplication?: boolean;
  onSubmitSuccess: () => void;
  isUploading: boolean;
  setIsUploading: (value: boolean) => void;
}

const ApplicationForm = ({ 
  jobTitle, 
  isApplication = false,
  onSubmitSuccess,
  isUploading,
  setIsUploading
}: ApplicationFormProps) => {
  // Definiert einen Standard-Webhook-URL für das Formular
  const webhookUrl = "https://automatisierung.seserver.nohype-ai.de/webhook/n8n-form-webhook";

  return (
    <N8NWebhookForm 
      webhookUrl={webhookUrl}
      jobTitle={jobTitle}
      isApplication={isApplication}
      onSubmitSuccess={onSubmitSuccess}
      isUploading={isUploading}
      setIsUploading={setIsUploading}
    />
  );
};

export default ApplicationForm;
