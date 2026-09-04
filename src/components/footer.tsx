import { Wrapper } from "./wrapper";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-6 text-text-muted text-sm">
      <Wrapper className="flex flex-col md:flex-row md:justify-between">
        <p>
          One Piece Wiki &copy; {currentYear} - desenvolvido por Guilherme
          Evangelista
        </p>
        <p>Dados da api-onepiece.com</p>
      </Wrapper>
    </footer>
  );
};
