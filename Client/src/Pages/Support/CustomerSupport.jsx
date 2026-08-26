import { useState } from "react";
import { motion } from "framer-motion";
import {
  Truck,
  RotateCcw,
  HelpCircle,
  ChevronDown,
  Mail,
  PackageCheck,
  Clock3,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

import Seo from "../../Components/SEO/Seo";
import {
  containerVariants,
  itemVariants,
} from "../../Components/Ui/HeroAnimation";

const CustomerSupport = () => {
  const [openFaq, setOpenFaq] = useState(null);

  // =========================================================
  // FAQ DATA
  // =========================================================

  const faqs = [
    {
      question: "How long does shipping take?",
      answer:
        "Orders are generally processed within 1–2 business days. Delivery time may vary depending on your location and the shipping service used.",
    },
    {
      question: "Can I return a product?",
      answer:
        "Yes. Eligible products can be returned according to our return policy. Items should generally be unused, unworn and in their original condition with applicable packaging and tags.",
    },
    {
      question: "Can I exchange a product for another size?",
      answer:
        "Yes, eligible products may be exchanged for another available size depending on stock availability. Please contact our support team as soon as possible after receiving your order.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order has been shipped, tracking information can be provided through your order details or shipping communication.",
    },
    {
      question: "What happens if I receive a damaged product?",
      answer:
        "If your product arrives damaged or has an issue, please contact our support team with your order details and photographs of the product so we can assist you.",
    },
    {
      question: "Can I cancel my order?",
      answer:
        "Order cancellation may be possible before the order has been processed or shipped. Contact customer support as soon as possible if you need to cancel an order.",
    },
    {
      question: "How can I contact ThreadCraft?",
      answer:
        "You can contact our customer support team through the support email provided below. Please include your order number when contacting us about an existing order.",
    },
  ];

  // =========================================================
  // SUPPORT CARDS
  // =========================================================

  const supportCards = [
    {
      id: "shipping",
      icon: Truck,
      label: "Delivery",
      title: "Shipping Policy",
      description:
        "Everything you need to know about order processing, delivery and tracking.",
      href: "#shipping",
    },
    {
      id: "returns",
      icon: RotateCcw,
      label: "Returns",
      title: "Returns & Exchange",
      description:
        "Learn about eligible returns, exchanges and how to request support.",
      href: "#returns",
    },
    {
      id: "faqs",
      icon: HelpCircle,
      label: "Help Center",
      title: "Frequently Asked Questions",
      description:
        "Find quick answers to common questions about ThreadCraft orders.",
      href: "#faqs",
    },
  ];

  // =========================================================
  // TOGGLE FAQ
  // =========================================================

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      {/* =====================================================
          SEO
      ====================================================== */}

      <Seo
        title="Customer Support | Shipping, Returns & FAQs | ThreadCraft"
        description="Get help with ThreadCraft orders, shipping, returns, exchanges and frequently asked questions. Find the information you need and contact our support team."
        canonical="https://thread-craft-mu.vercel.app/customer-support"
      />

      <main className="min-h-screen bg-[#111111] px-4 pb-20 pt-20 text-white sm:px-6 md:pt-24 lg:px-10 lg:pt-28">
        <div className="mx-auto max-w-7xl">
          {/* =====================================================
              PAGE HEADER
          ====================================================== */}

          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-10 md:mb-12"
          >
            <motion.p
              variants={itemVariants}
              className="text-xs uppercase tracking-[0.25em] text-[#C19A6B]"
            >
              Support
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="mt-4 text-3xl font-light tracking-wide text-white sm:text-4xl md:text-5xl"
            >
              Customer Support
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-4 max-w-2xl text-sm leading-7 text-white/40 sm:text-base"
            >
              Find answers about shipping, returns, exchanges and common
              questions about your ThreadCraft experience.
            </motion.p>
          </motion.section>

          {/* =====================================================
              SUPPORT NAVIGATION CARDS
          ====================================================== */}

          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="mb-8"
          >
            <motion.div variants={itemVariants} className="mb-5">
              <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                How Can We Help?
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-3">
              {supportCards.map((card) => {
                const Icon = card.icon;

                return (
                  <motion.a
                    key={card.id}
                    href={card.href}
                    variants={itemVariants}
                    whileHover={{
                      y: -5,
                      transition: {
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }}
                    className="group rounded-xl border border-white/10 bg-[#111111] p-6 transition-colors duration-300 hover:border-[#C19A6B]/30"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#C19A6B]/5">
                        <Icon size={21} className="text-[#C19A6B]" />
                      </div>

                      <ArrowUpRight
                        size={19}
                        className="text-white/20 transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#C19A6B]"
                      />
                    </div>

                    <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-[#C19A6B]">
                      {card.label}
                    </p>

                    <h2 className="mt-2 text-lg font-medium">{card.title}</h2>

                    <p className="mt-2 text-sm leading-6 text-white/40">
                      {card.description}
                    </p>

                    <div className="mt-5 text-xs uppercase tracking-[0.15em] text-[#C19A6B]">
                      Learn More
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.section>

          {/* =====================================================
              SHIPPING POLICY
          ====================================================== */}

          <motion.section
            id="shipping"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-8 scroll-mt-24 overflow-hidden rounded-xl border border-white/10 bg-[#111111]"
          >
            {/* Section Header */}

            <div className="border-b border-white/10 px-6 py-5 sm:px-8">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#C19A6B]/5">
                  <Truck size={20} className="text-[#C19A6B]" />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#C19A6B]">
                    Delivery
                  </p>

                  <h2 className="mt-1 text-lg font-medium sm:text-xl">
                    Shipping Policy
                  </h2>
                </div>
              </div>
            </div>

            {/* Section Content */}

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid gap-5 p-6 sm:p-8 md:grid-cols-2"
            >
              {/* Processing */}

              <motion.div
                variants={itemVariants}
                whileHover={{ y: -3 }}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-colors duration-300 hover:border-[#C19A6B]/20"
              >
                <Clock3 size={20} className="text-[#C19A6B]" />

                <h3 className="mt-4 text-sm font-medium">Order Processing</h3>

                <p className="mt-3 text-sm leading-7 text-white/40">
                  Orders are generally processed within 1–2 business days.
                  Processing times may vary during high-demand periods, holidays
                  or promotional events.
                </p>
              </motion.div>

              {/* Delivery */}

              <motion.div
                variants={itemVariants}
                whileHover={{ y: -3 }}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-colors duration-300 hover:border-[#C19A6B]/20"
              >
                <PackageCheck size={20} className="text-[#C19A6B]" />

                <h3 className="mt-4 text-sm font-medium">Delivery</h3>

                <p className="mt-3 text-sm leading-7 text-white/40">
                  Delivery time depends on your location and shipping service.
                  Estimated delivery information may be provided during the
                  ordering or shipping process.
                </p>
              </motion.div>

              {/* Tracking */}

              <motion.div
                variants={itemVariants}
                whileHover={{ y: -3 }}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-colors duration-300 hover:border-[#C19A6B]/20"
              >
                <Truck size={20} className="text-[#C19A6B]" />

                <h3 className="mt-4 text-sm font-medium">Order Tracking</h3>

                <p className="mt-3 text-sm leading-7 text-white/40">
                  Once your order is shipped, tracking information may be
                  provided so you can monitor the progress of your delivery.
                </p>
              </motion.div>

              {/* Delays */}

              <motion.div
                variants={itemVariants}
                whileHover={{ y: -3 }}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-colors duration-300 hover:border-[#C19A6B]/20"
              >
                <ShieldCheck size={20} className="text-[#C19A6B]" />

                <h3 className="mt-4 text-sm font-medium">Delivery Delays</h3>

                <p className="mt-3 text-sm leading-7 text-white/40">
                  Occasionally, deliveries may be delayed because of weather,
                  logistics, holidays or circumstances outside our control.
                </p>
              </motion.div>
            </motion.div>
          </motion.section>

          {/* =====================================================
              RETURNS & EXCHANGE
          ====================================================== */}

          <motion.section
            id="returns"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-8 scroll-mt-24 overflow-hidden rounded-xl border border-white/10 bg-[#111111]"
          >
            {/* Header */}

            <div className="border-b border-white/10 px-6 py-5 sm:px-8">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#C19A6B]/5">
                  <RotateCcw size={20} className="text-[#C19A6B]" />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#C19A6B]">
                    Returns
                  </p>

                  <h2 className="mt-1 text-lg font-medium sm:text-xl">
                    Returns & Exchange
                  </h2>
                </div>
              </div>
            </div>

            {/* Content */}

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="space-y-6 p-6 sm:p-8"
            >
              <motion.div variants={itemVariants}>
                <h3 className="text-sm font-medium">Return Eligibility</h3>

                <p className="mt-3 text-sm leading-7 text-white/40">
                  Products may be eligible for return depending on the product
                  category and condition. Items should generally be unused,
                  unworn and returned with their original packaging and tags
                  where applicable.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-sm font-medium">Exchange</h3>

                <p className="mt-3 text-sm leading-7 text-white/40">
                  If you need another size or eligible replacement, contact our
                  support team. Exchanges are subject to product availability.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-sm font-medium">
                  Damaged or Incorrect Items
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/40">
                  If you receive a damaged, defective or incorrect product,
                  contact us as soon as possible with your order details and
                  photographs of the item.
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-sm font-medium">Refunds</h3>

                <p className="mt-3 text-sm leading-7 text-white/40">
                  Approved refunds are processed according to the applicable
                  return conditions and original payment method.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="rounded-xl border border-[#C19A6B]/20 bg-[#C19A6B]/5 p-5"
              >
                <p className="text-sm leading-7 text-white/40">
                  <span className="text-white/70">Important:</span> Before
                  publishing this policy for a real store, replace these general
                  guidelines with your actual return window, eligibility
                  requirements, shipping responsibility and refund rules.
                </p>
              </motion.div>
            </motion.div>
          </motion.section>

          {/* =====================================================
              FAQ
          ====================================================== */}

          <motion.section
            id="faqs"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-8 scroll-mt-24 overflow-hidden rounded-xl border border-white/10 bg-[#111111]"
          >
            {/* Header */}

            <div className="border-b border-white/10 px-6 py-5 sm:px-8">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#C19A6B]/5">
                  <HelpCircle size={20} className="text-[#C19A6B]" />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#C19A6B]">
                    Help Center
                  </p>

                  <h2 className="mt-1 text-lg font-medium sm:text-xl">
                    Frequently Asked Questions
                  </h2>
                </div>
              </div>
            </div>

            {/* FAQ Items */}

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="p-6 sm:p-8"
            >
              <div className="space-y-3">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;

                  return (
                    <motion.div
                      key={faq.question}
                      variants={itemVariants}
                      className="overflow-hidden border border-white/10"
                    >
                      {/* Question */}

                      <button
                        type="button"
                        onClick={() => toggleFaq(index)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left transition hover:bg-white/[0.02]"
                      >
                        <span className="text-sm font-medium text-white/80">
                          {faq.question}
                        </span>

                        <ChevronDown
                          size={18}
                          className={`shrink-0 text-[#C19A6B] transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Answer */}

                      <motion.div
                        initial={false}
                        animate={{
                          height: isOpen ? "auto" : 0,
                          opacity: isOpen ? 1 : 0,
                        }}
                        transition={{
                          duration: 0.35,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-white/10 px-5 py-5">
                          <p className="text-sm leading-7 text-white/40">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.section>

          {/* =====================================================
              CONTACT SUPPORT
          ====================================================== */}

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-hidden rounded-xl border border-white/10 bg-[#111111]"
          >
            <div className="flex flex-col gap-6 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#C19A6B]">
                  Need More Help?
                </p>

                <h2 className="mt-2 text-xl font-medium">
                  We're here to help.
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-white/40">
                  Can't find what you're looking for? Contact the ThreadCraft
                  support team and we'll help you with your question.
                </p>
              </div>

              <motion.a
                href="mailto:support@threadcraft.com"
                whileHover={{
                  x: 3,
                  transition: {
                    duration: 0.25,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }}
                className="inline-flex w-fit shrink-0 items-center gap-2 border border-white/10 px-5 py-3 text-xs font-medium uppercase tracking-[0.15em] text-white/60 transition hover:border-[#C19A6B]/50 hover:text-[#C19A6B]"
              >
                <Mail size={15} />
                Contact Support
                <ArrowUpRight size={14} />
              </motion.a>
            </div>
          </motion.section>
        </div>
      </main>
    </>
  );
};

export default CustomerSupport;
