import Header from '@/components/Header';

export default function Home() {
  return (
    <div>
      <Header />
      <main className="container">
        <h1>Painel de Controle de Empréstimos</h1>
        <p>Utilize o menu acima para gerenciar clientes ou realizar simulações de crédito.</p>
      </main>
    </div>
  );
}