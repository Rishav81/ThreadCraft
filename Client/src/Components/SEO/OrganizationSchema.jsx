const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ThreadCraft",
    url: "https://thread-craft-mu.vercel.app/",
    logo: "https://thread-craft-mu.vercel.app/Images/logo.png",
    description:
      "ThreadCraft is a modern fashion brand offering stylish clothing for men, women, and kids.",
  };

  return <script type="application/ld+json">{JSON.stringify(schema)}</script>;
};

export default OrganizationSchema;
