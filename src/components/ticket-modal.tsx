"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QRCodeSVG } from "qrcode.react";
import { Download, Printer, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QueueTicketModalData {
  name: string;
  phone: string;
  purpose: string;
  staff: string;
  ticketNumber?: string;
  timestamp?: Date;
}

interface TicketModalProps {
  ticket: QueueTicketModalData;
  isOpen: boolean;
  onClose: () => void;
}

export function TicketModal({ ticket, isOpen, onClose }: TicketModalProps) {
  const { toast } = useToast();

  const qrData = JSON.stringify({
    ticketNumber: ticket.ticketNumber,
    name: ticket.name,
    timestamp: ticket.timestamp,
  });

  const handleDownloadPDF = () => {
    // In a real app, you'd generate a proper PDF
    toast({
      title: "PDF Generated",
      description: "Your ticket has been downloaded as PDF",
    });
  };

  const handlePrint = () => {
    window.print();
    toast({
      title: "Print Dialog Opened",
      description: "Please use your browser's print function",
    });
  };

  const handleEmail = () => {
    toast({
      title: "Email Sent",
      description: "Ticket has been sent to your email address",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-primary">
            Queue Ticket Generated
          </DialogTitle>
        </DialogHeader>

        <Card className="border-2 border-dashed border-primary/20">
          <CardContent className="p-6 text-center space-y-4">
            <div className="text-3xl font-bold text-primary">
              {ticket.ticketNumber}
            </div>

            <div className="flex justify-center">
              <QRCodeSVG
                value={qrData}
                size={120}
                bgColor="#ffffff"
                fgColor="#15803d"
                level="M"
              />
            </div>

            <div className="space-y-2 text-sm">
              <div>
                <strong>Name:</strong> {ticket.name}
              </div>
              <div>
                <strong>Phone:</strong> {ticket.phone}
              </div>
              <div>
                <strong>Purpose:</strong> {ticket.purpose}
              </div>
              <div>
                <strong>Staff:</strong> {ticket.staff}
              </div>
              <div>
                <strong>Time:</strong> {ticket.timestamp?.toLocaleString()}
              </div>
            </div>

            <div className="text-xs text-muted-foreground border-t pt-4">
              Please keep this ticket with you and wait for your number to be
              called. You can also check your queue status using the ticket
              number.
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button
            onClick={handleDownloadPDF}
            variant="outline"
            className="flex-1 bg-transparent"
          >
            <Download className="h-4 w-4 mr-2" />
            PDF
          </Button>
          <Button
            onClick={handlePrint}
            variant="outline"
            className="flex-1 bg-transparent"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button
            onClick={handleEmail}
            variant="outline"
            className="flex-1 bg-transparent"
          >
            <Mail className="h-4 w-4 mr-2" />
            Email
          </Button>
        </div>

        <Button onClick={onClose} className="w-full">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}
