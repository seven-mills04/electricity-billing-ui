import React, { useState } from "react";
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails, Stack } from "@mui/material";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

const FAQ = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqs = [
    {
      id: "panel1",
      question: "How do I pay my bill?",
      answer: "You can pay your electricity bill online without logging in by using our 'Quick Services' payment portal. Alternatively, you can log in to the 'Consumer Portal', navigate to the 'Bills' section, and choose from UPI, credit/debit cards, net banking, or electronic wallets. Settle dues securely in just three steps.",
    },
    {
      id: "panel2",
      question: "How do I apply for a new connection?",
      answer: "To apply for a new residential or commercial electricity connection, you must log in to the Consumer Portal. Under the 'Connections' tab, fill out the new connection request form, upload proof of ownership and identification, and submit. An executive will review and process your request within 5 working days.",
    },
    {
      id: "panel3",
      question: "How can I submit meter readings?",
      answer: "Smart meter readings are synchronized automatically. However, if your meter category supports self-reporting, you can submit your meter reading directly. Log in to the 'Consumer Portal', head to the 'Meter Readings' section, input your current cumulative kWh register value, upload a photograph of the meter display, and submit.",
    },
    {
      id: "panel4",
      question: "How do I download my receipt?",
      answer: "All transaction receipts are generated instantly upon payment confirmation. You can download historical receipts by logging in to the portal and viewing your payment ledger. For quick payments, the PDF receipt is made available on-screen immediately after a successful transaction.",
    },
    {
      id: "panel5",
      question: "How do I reset my password?",
      answer: "If you forget your portal password, go to the portal Login page, click the 'Forgot Password' link, enter your registered Consumer Number or email address, and follow the password recovery instructions sent to your registered mobile or inbox.",
    },
  ];

  return (
    <Box
      id="faq"
      sx={{
        py: { xs: 10, md: 14 },
        bgcolor: "#F7F9FC",
      }}
    >
      <Container maxWidth="md">
        {/* Section Header */}
        <Stack alignItems="center" textAlign="center" spacing={2} sx={{ mb: 8 }}>
          <Typography
            variant="h6"
            sx={{
              color: "#00A99D",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Help Desk
          </Typography>
          <Typography
            variant="h2"
            sx={{
              color: "#0056A6",
              fontWeight: 800,
              fontSize: { xs: "2rem", md: "2.5rem" },
            }}
          >
            Frequently Asked Questions
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#475569",
              maxWidth: "500px",
            }}
          >
            Find quick answers to common questions regarding account setup, payments, billing, and connection requests.
          </Typography>
        </Stack>

        {/* FAQs Accordions */}
        <Stack spacing={2.5}>
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Accordion
                expanded={expanded === faq.id}
                onChange={handleChange(faq.id)}
                elevation={0}
                sx={{
                  borderRadius: "14px !important",
                  border: "1px solid #E2E8F0",
                  bgcolor: "#FFFFFF",
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                  "&::before": { display: "none" },
                  "&:hover": {
                    borderColor: "#0056A6",
                  },
                  boxShadow: expanded === faq.id ? "0 4px 12px rgba(0, 86, 166, 0.04)" : "none",
                }}
              >
                <AccordionSummary
                  expandIcon={<ChevronDown size={18} color="#0056A6" />}
                  sx={{
                    px: 3,
                    py: 1,
                    "& .MuiAccordionSummary-content": {
                      alignItems: "center",
                      gap: 2,
                    },
                  }}
                >
                  <Box sx={{ color: "#0056A6", display: "flex" }}>
                    <HelpCircle size={20} />
                  </Box>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: expanded === faq.id ? "#0056A6" : "#1E293B",
                      fontSize: "1.05rem",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 3, pb: 3.5, pl: 7.5 }}>
                  <Typography
                    sx={{
                      color: "#475569",
                      lineHeight: 1.6,
                      fontSize: "0.925rem",
                    }}
                  >
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </motion.div>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default FAQ;
