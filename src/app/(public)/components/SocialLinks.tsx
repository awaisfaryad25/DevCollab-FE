import {
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
  FaFacebookF,
} from "react-icons/fa6";

const SocialLinks = () => {
  return (
    <div>
      <div className=" flex items-center gap-4">
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground"
          aria-label="Twitter"
        >
          <FaXTwitter />
        </a>

        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-[#0a66c2]"
          aria-label="LinkedIn"
        >
          <FaLinkedinIn />
        </a>
        <a
          href="https:/facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-[#0866ff]"
          aria-label="LinkedIn"
        >
          <FaFacebookF />
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;
