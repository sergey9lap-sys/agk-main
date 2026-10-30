import ClientEffects from "../ClientEffects";
import TariffsSection from "../TariffsSection";

export default function PricingPage() {
  return (
    <main className="site-shell pricing-page">
      <ClientEffects />
      <TariffsSection className="pricing-only" />
    </main>
  );
}
