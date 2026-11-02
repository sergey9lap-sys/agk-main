import type { Metadata } from "next";
import "../src/styles.css";
import "../src/recording.css";
import "../src/revision-two.css";
import "../src/revision-three.css";
import "../src/revision-four.css";
import "../src/revision-five.css";
import "../src/revision-six.css";

export const metadata: Metadata = {
  title: "Методология премиальных программ",
  description:
    "Мастер-класс в записи Александры Горевой-Куртышевой о премиальных программах, консалтинге и агентствах в реалиях 2026 года.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        {children}
      </body>
    </html>
  );
}
