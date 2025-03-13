import { useState } from "react";

const ProductApp = () => {
  const [products, setProducts] = useState([
    { id: 1, libelle: "Produit A", prix: 20, stock: 10 },
    { id: 2, libelle: "Produit B", prix: 30, stock: 5 },
  ]);
  const [form, setForm] = useState({ libelle: "", prix: "", stock: "" });
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = { id: Date.now(), ...form, prix: Number(form.prix), stock: Number(form.stock) };
    setProducts([...products, newProduct]);
    setForm({ libelle: "", prix: "", stock: "" });
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const filteredProducts = products.filter((product) =>
    product.libelle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gestion des Produits</h1>
      
      {/* Recherche */}
      <input
        type="text"
        placeholder="Rechercher..."
        className="w-full p-2 border mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      
      {/* Formulaire d'ajout */}
      <form onSubmit={handleSubmit} className="mb-4 grid grid-cols-3 gap-2">
        <input type="text" name="libelle" placeholder="Libellé" className="p-2 border" value={form.libelle} onChange={handleChange} required />
        <input type="number" name="prix" placeholder="Prix" className="p-2 border" value={form.prix} onChange={handleChange} required />
        <input type="number" name="stock" placeholder="Stock" className="p-2 border" value={form.stock} onChange={handleChange} required />
        <button type="submit" className="col-span-3 bg-blue-500 text-white p-2 rounded">Ajouter</button>
      </form>
      
      {/* Liste des produits */}
      <ul className="space-y-2">
        {filteredProducts.map((product) => (
          <li key={product.id} className="p-2 border flex justify-between items-center">
            <span>{product.libelle} - {product.prix}€ - Stock: {product.stock}</span>
            <button className="bg-red-500 text-white p-1 rounded" onClick={() => handleDelete(product.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductApp;
