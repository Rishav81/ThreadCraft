import { Helmet } from "react-helmet-async";

const Seo = ({ title, description, canonical }) => {
  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />

      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  );
};

export default Seo;
