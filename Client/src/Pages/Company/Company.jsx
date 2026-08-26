import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  BriefcaseBusiness,
  ShieldCheck,
  FileText,
  ChevronDown,
  Sparkles,
  Mail,
  ArrowUpRight,
} from "lucide-react";
import Seo from "../../Components/SEO/Seo";

import {
  containerVariants,
  itemVariants,
} from "../../Components/Ui/HeroAnimation";

const Company = () => {
  const [openJob, setOpenJob] = useState(null);

  const careers = [
    {
      title: "Frontend Developer",
      type: "Full Time",
      description:
        "Help us build beautiful, fast and user-friendly shopping experiences using modern frontend technologies.",
    },
    {
      title: "Full Stack Developer",
      type: "Full Time",
      description:
        "Work across the ThreadCraft platform and help build reliable e-commerce experiences from frontend to backend.",
    },
    {
      title: "Fashion & Content Intern",
      type: "Internship",
      description:
        "Help create engaging fashion content, product stories and digital experiences for the ThreadCraft community.",
    },
  ];

  const exploreCards = [
    {
      id: "about",
      icon: Building2,
      label: "Our Story",
      title: "About ThreadCraft",
      description:
        "Learn about our vision, values and approach to modern fashion.",
      action: "Our Story",
    },
    {
      id: "careers",
      icon: BriefcaseBusiness,
      label: "Opportunities",
      title: "Careers",
      description: "Explore opportunities and grow with the ThreadCraft team.",
      action: "Join Us",
    },
    {
      id: "privacy",
      icon: ShieldCheck,
      label: "Legal",
      title: "Privacy Policy",
      description: "Understand how ThreadCraft handles customer information.",
      action: "Read Policy",
    },
    {
      id: "terms",
      icon: FileText,
      label: "Legal",
      title: "Terms & Conditions",
      description: "Review the terms that govern your use of ThreadCraft.",
      action: "Read Terms",
    },
  ];

  return (
    <>
      <Seo
        title="About ThreadCraft | Careers, Privacy & Terms"
        description="Learn more about ThreadCraft, explore career opportunities, and review our privacy policy and terms and conditions."
        canonical="https://thread-craft-mu.vercel.app/company"
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
              ThreadCraft
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="mt-4 text-3xl font-light tracking-wide text-white sm:text-4xl md:text-5xl"
            >
              Company
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-4 max-w-2xl text-sm leading-7 text-white/40 sm:text-base"
            >
              Discover the story behind ThreadCraft, explore opportunities with
              our team, and learn about our policies and terms.
            </motion.p>
          </motion.section>

          {/* =====================================================
              EXPLORE CARDS
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
                Explore
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {exploreCards.map((card) => {
                const Icon = card.icon;

                return (
                  <motion.a
                    key={card.id}
                    href={`#${card.id}`}
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

                    <h2 className="mt-6 text-lg font-medium">{card.title}</h2>

                    <p className="mt-2 text-sm leading-6 text-white/40">
                      {card.description}
                    </p>

                    <div className="mt-5 text-xs uppercase tracking-[0.15em] text-[#C19A6B]">
                      {card.action}
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.section>

          {/* =====================================================
              ABOUT
          ====================================================== */}

          <motion.section
            id="about"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-8 scroll-mt-24 overflow-hidden rounded-xl border border-white/10 bg-[#111111]"
          >
            <div className="border-b border-white/10 px-6 py-5 sm:px-8">
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#C19A6B]/5"
                >
                  <Building2 size={20} className="text-[#C19A6B]" />
                </motion.div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#C19A6B]">
                    Our Story
                  </p>

                  <h2 className="mt-1 text-lg font-medium sm:text-xl">
                    About ThreadCraft
                  </h2>
                </div>
              </div>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="grid gap-6 p-6 sm:p-8 lg:grid-cols-2"
            >
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-light tracking-wide">
                  Fashion with character.
                </h3>

                <p className="mt-5 text-sm leading-8 text-white/40">
                  ThreadCraft is a modern fashion platform focused on bringing
                  together timeless style, quality clothing and effortless
                  shopping experiences.
                </p>

                <p className="mt-4 text-sm leading-8 text-white/40">
                  Our goal is to make discovering clothing feel simple,
                  inspiring and personal while creating a space where customers
                  can explore styles that fit their everyday lives.
                </p>
              </motion.div>

              <motion.div
                variants={containerVariants}
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1"
              >
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -3 }}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-colors duration-300 hover:border-[#C19A6B]/20"
                >
                  <Sparkles size={20} className="text-[#C19A6B]" />

                  <h3 className="mt-4 text-sm font-medium">Our Vision</h3>

                  <p className="mt-2 text-sm leading-6 text-white/40">
                    Create a thoughtful digital fashion experience that combines
                    style, quality and simplicity.
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -3 }}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-colors duration-300 hover:border-[#C19A6B]/20"
                >
                  <ShieldCheck size={20} className="text-[#C19A6B]" />

                  <h3 className="mt-4 text-sm font-medium">Our Values</h3>

                  <p className="mt-2 text-sm leading-6 text-white/40">
                    We value quality, creativity, transparency and a
                    customer-first approach.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.section>

          {/* =====================================================
              CAREERS
          ====================================================== */}

          <motion.section
            id="careers"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-8 scroll-mt-24 overflow-hidden rounded-xl border border-white/10 bg-[#111111]"
          >
            <div className="border-b border-white/10 px-6 py-5 sm:px-8">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#C19A6B]/5">
                  <BriefcaseBusiness size={20} className="text-[#C19A6B]" />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#C19A6B]">
                    Opportunities
                  </p>

                  <h2 className="mt-1 text-lg font-medium sm:text-xl">
                    Careers at ThreadCraft
                  </h2>
                </div>
              </div>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="p-6 sm:p-8"
            >
              <motion.div variants={itemVariants} className="mb-8 max-w-2xl">
                <h3 className="text-2xl font-light">
                  Build the future of fashion with us.
                </h3>

                <p className="mt-4 text-sm leading-7 text-white/40">
                  We're always interested in meeting creative and motivated
                  people who want to contribute to the ThreadCraft journey.
                </p>
              </motion.div>

              <div className="space-y-3">
                {careers.map((job, index) => {
                  const isOpen = openJob === index;

                  return (
                    <motion.div
                      key={job.title}
                      variants={itemVariants}
                      className="border border-white/10"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenJob(isOpen ? null : index)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left transition hover:bg-white/[0.02]"
                      >
                        <div>
                          <h3 className="text-sm font-medium">{job.title}</h3>

                          <p className="mt-1 text-xs uppercase tracking-[0.12em] text-white/30">
                            {job.type}
                          </p>
                        </div>

                        <ChevronDown
                          size={18}
                          className={`shrink-0 text-[#C19A6B] transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

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
                            {job.description}
                          </p>

                          <a
                            href="mailto:careers@threadcraft.com"
                            className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#C19A6B] transition hover:text-[#d0aa7b]"
                          >
                            Apply via Email
                            <ArrowUpRight size={14} />
                          </a>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.section>

          {/* =====================================================
              PRIVACY
          ====================================================== */}

          <motion.section
            id="privacy"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-8 scroll-mt-24 overflow-hidden rounded-xl border border-white/10 bg-[#111111]"
          >
            <div className="border-b border-white/10 px-6 py-5 sm:px-8">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#C19A6B]/5">
                  <ShieldCheck size={20} className="text-[#C19A6B]" />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#C19A6B]">
                    Legal
                  </p>

                  <h2 className="mt-1 text-lg font-medium sm:text-xl">
                    Privacy Policy
                  </h2>
                </div>
              </div>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="space-y-6 p-6 sm:p-8"
            >
              {[
                [
                  "Information We Collect",
                  "ThreadCraft may collect information that you provide when creating an account, placing an order, managing your profile or contacting customer support.",
                ],
                [
                  "How We Use Information",
                  "Information may be used to provide services, process orders, communicate with customers, improve the platform and maintain account security.",
                ],
                [
                  "Data Security",
                  "We take reasonable measures to protect information associated with ThreadCraft accounts and transactions.",
                ],
                [
                  "Your Information",
                  "Depending on applicable laws and circumstances, you may have rights regarding your personal information. Contact ThreadCraft if you have questions about your data.",
                ],
              ].map(([heading, text]) => (
                <motion.div key={heading} variants={itemVariants}>
                  <h3 className="text-sm font-medium">{heading}</h3>

                  <p className="mt-3 text-sm leading-7 text-white/40">{text}</p>
                </motion.div>
              ))}

              <motion.div
                variants={itemVariants}
                className="rounded-xl border border-[#C19A6B]/20 bg-[#C19A6B]/5 p-5"
              >
                <p className="text-sm leading-7 text-white/40">
                  This section is a website template and should be reviewed
                  against your actual privacy practices and applicable legal
                  requirements before publishing.
                </p>
              </motion.div>
            </motion.div>
          </motion.section>

          {/* =====================================================
              TERMS
          ====================================================== */}

          <motion.section
            id="terms"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-8 scroll-mt-24 overflow-hidden rounded-xl border border-white/10 bg-[#111111]"
          >
            <div className="border-b border-white/10 px-6 py-5 sm:px-8">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#C19A6B]/5">
                  <FileText size={20} className="text-[#C19A6B]" />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#C19A6B]">
                    Legal
                  </p>

                  <h2 className="mt-1 text-lg font-medium sm:text-xl">
                    Terms & Conditions
                  </h2>
                </div>
              </div>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="space-y-6 p-6 sm:p-8"
            >
              {[
                [
                  "Use of the Website",
                  "By accessing ThreadCraft, you agree to use the website responsibly and in accordance with applicable laws and these terms.",
                ],
                [
                  "Products & Pricing",
                  "Product information, availability, descriptions and pricing may change. ThreadCraft aims to keep product information accurate and up to date.",
                ],
                [
                  "Orders & Payments",
                  "Orders are subject to availability and successful payment confirmation. Additional conditions may apply depending on the order and payment method.",
                ],
                [
                  "Account Responsibility",
                  "Customers are responsible for maintaining accurate account information and protecting their account credentials.",
                ],
                [
                  "Changes to These Terms",
                  "ThreadCraft may update these terms when necessary. Updated terms will be made available through this page.",
                ],
              ].map(([heading, text]) => (
                <motion.div key={heading} variants={itemVariants}>
                  <h3 className="text-sm font-medium">{heading}</h3>

                  <p className="mt-3 text-sm leading-7 text-white/40">{text}</p>
                </motion.div>
              ))}

              <motion.div
                variants={itemVariants}
                className="rounded-xl border border-[#C19A6B]/20 bg-[#C19A6B]/5 p-5"
              >
                <p className="text-sm leading-7 text-white/40">
                  These terms are a general website template and should be
                  reviewed and adapted to your actual business operations and
                  applicable legal requirements before publishing.
                </p>
              </motion.div>
            </motion.div>
          </motion.section>

          {/* =====================================================
              CONTACT
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
                  Get In Touch
                </p>

                <h2 className="mt-2 text-xl font-medium">Have a question?</h2>

                <p className="mt-2 text-sm leading-6 text-white/40">
                  Our team is here to help with questions about ThreadCraft.
                </p>
              </div>

              <motion.a
                href="mailto:support@threadcraft.com"
                whileHover={{ x: 3 }}
                className="inline-flex w-fit items-center gap-2 border border-white/10 px-5 py-3 text-xs font-medium uppercase tracking-[0.15em] text-white/60 transition hover:border-[#C19A6B]/50 hover:text-[#C19A6B]"
              >
                <Mail size={15} />
                Contact Support
              </motion.a>
            </div>
          </motion.section>
        </div>
      </main>
    </>
  );
};

export default Company;
