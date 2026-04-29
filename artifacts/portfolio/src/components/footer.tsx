export function Footer() {
  const email = import.meta.env.VITE_CONTACT_EMAIL;
  const github = import.meta.env.VITE_GITHUB_URL;
  const linkedin = import.meta.env.VITE_LINKEDIN_URL;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t py-8 mt-16 bg-background">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
        <div className="mb-4 md:mb-0" data-testid="text-footer-copyright">
          © {currentYear} Krithika Rajendran
        </div>
        <div className="flex space-x-6">
          {email && (
            <a 
              href={`mailto:${email}`} 
              className="hover:text-foreground transition-colors"
              data-testid="link-footer-email"
            >
              Contact
            </a>
          )}
          {github && (
            <a 
              href={github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-foreground transition-colors"
              data-testid="link-footer-github"
            >
              GitHub
            </a>
          )}
          {linkedin && (
            <a 
              href={linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-foreground transition-colors"
              data-testid="link-footer-linkedin"
            >
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
