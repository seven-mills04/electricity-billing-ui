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
        py: { xs: 8, md: 12 },
        bgcolor: "transparent",
      }}
    >
      <Container maxWidth="md">
        <Stack alignItems="center" textAlign="center" spacing={2} sx={{ mb: 8 }}>
          <Typography
            variant="caption"
            sx={{
              color: "#075BB5",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            HELP DESK
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.85rem", md: "2.3rem" },
              color: "#171717",
            }}
          >
            Frequently Asked Questions
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#625F58",
              maxWidth: "500px",
              fontSize: "0.9rem",
            }}
          >
            Find quick answers to common questions regarding account setup, payments, billing, and connection requests.
          </Typography>
        </Stack>

        <Stack spacing={2}>
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Accordion
                expanded={expanded === faq.id}
                onChange={handleChange(faq.id)}
                elevation={0}
                sx={{
                  borderRadius: "2px !important",
                  border: "1px solid #C9C3B7",
                  bgcolor: "#FFFDF8",
                  color: "#171717",
                  transition: "background-color 120ms ease",
                  "&::before": { display: "none" },
                  "&:hover": {
                    borderColor: "#171717",
                  },
                  boxShadow: "none",
                }}
              >
                <AccordionSummary
                  expandIcon={<ChevronDown size={18} color="#171717" />}
                  sx={{
                    px: 3,
                    py: 1,
                    "& .MuiAccordionSummary-content": {
                      alignItems: "center",
                      gap: 2,
                    },
                  }}
                >
                  <Box sx={{ color: "#075BB5", display: "flex" }}>
                    <HelpCircle size={18} />
                  </Box>
                  <Typography
                    sx={{
                      fontWeight: 800,
                      color: expanded === faq.id ? "#075BB5" : "#171717",
                      fontSize: "0.95rem",
                      transition: "color 120ms ease",
                    }}
                  >
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 3, pb: 3, pl: 7.5 }}>
                  <Typography
                    sx={{
                      color: "#625F58",
                      lineHeight: 1.55,
                      fontSize: "0.875rem",
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
