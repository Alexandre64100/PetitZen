import React, { useState, useRef, useEffect } from 'react';
import { Send, Camera, FileText, Calculator, Calendar, User, MessageCircle, Mic, MicOff, Download, Upload, BarChart3, Smartphone, CreditCard, Package, Users, Bell, Settings, TrendingUp, DollarSign, AlertTriangle } from 'lucide-react';

const PetitZen = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Salut ! Je suis Alex, le créateur de PetitZen ! 👋\n\n🎉 **BETA GRATUITE - 3 MOIS !** 🎉\n\n💡 **Mon but :** Supprimer ou réduire votre budget comptable !\n\nVous faites partie des beta-testeurs privilégiés ! Votre mission : tester toutes les fonctions et me dire ce qui peut être amélioré.\n\n🎯 **Vous devez générer du chiffre d'affaires, pas faire de la comptabilité !**\n\nPetitZen s'occupe de tout : factures, stock, banking, social media... pour que vous puissiez vous concentrer sur ce qui rapporte !\n\n**Alors, qu'est-ce qu'on teste en premier ? 😊**",
      timestamp: new Date()
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'Marc (Beta-testeur)',
    business: 'Peinture & Rénovation',
    status: 'Auto-entrepreneur',
    isSetup: true
  });
  const [isListening, setIsListening] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'urgent', message: 'Déclaration URSSAF dans 5 jours', time: '2h' },
    { id: 2, type: 'info', message: 'Stock peinture blanche faible', time: '1j' },
    { id: 3, type: 'success', message: 'Facture Dupont payée', time: '2j' }
  ]);
  const [documents, setDocuments] = useState([
    { id: 1, type: 'facture', name: 'Facture_Dupont_001.pdf', amount: '450€', status: 'payée' },
    { id: 2, type: 'devis', name: 'Devis_Martin_002.pdf', amount: '780€', status: 'en_attente' },
    { id: 3, type: 'note_frais', name: 'Essence_25-06.pdf', amount: '65€', status: 'validée' }
  ]);
  const [stockItems, setStockItems] = useState([
    { id: 1, name: 'Peinture blanche 15L', stock: 3, seuil: 5, fournisseur: 'Leroy Merlin' },
    { id: 2, name: 'Rouleau 25cm', stock: 12, seuil: 10, fournisseur: 'Castorama' },
    { id: 3, name: 'Bâche protection', stock: 2, seuil: 5, fournisseur: 'Leroy Merlin' }
  ]);
  const [bankingData, setBankingData] = useState({
    solde: 4250.80,
    ca_mois: 3200,
    charges_mois: 850,
    benefice_mois: 2350
  });

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleVoiceRecognition = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setInputMessage("Génère-moi une facture pour le chantier Dupont");
        setIsListening(false);
      }, 2000);
    }
  };

  const quickActions = [
    { icon: Camera, text: "📸 Scan document", action: "scan_document", tab: "chat" },
    { icon: FileText, text: "📄 Créer facture", action: "create_invoice", tab: "documents" },
    { icon: Package, text: "📦 Gérer stock", action: "manage_stock", tab: "stock" },
    { icon: CreditCard, text: "💳 Banking", action: "banking", tab: "banking" }
  ];

  const tabs = [
    { id: 'chat', label: 'Assistant Alex', icon: MessageCircle },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'stock', label: 'Stock', icon: Package },
    { id: 'banking', label: 'Finances', icon: CreditCard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'social', label: 'Social Media', icon: Smartphone }
  ];

  const handleQuickAction = (action, tab) => {
    setActiveTab(tab);
    let message = "";
    switch(action) {
      case 'scan_document':
        message = "Je veux scanner un document";
        break;
      case 'create_invoice':
        message = "Aide-moi à créer une facture";
        break;
      case 'manage_stock':
        message = "Montre-moi la gestion de stock";
        break;
      case 'banking':
        message = "Affiche mes données bancaires";
        break;
    }
    if (tab === 'chat') {
      setInputMessage(message);
      handleSendMessage(message);
    }
  };

  const getBotResponse = async (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('facture') || lowerMessage.includes('créer')) {
      return "Super ! **Générateur de factures PetitZen** 📄\n\n✅ **Template professionnel personnalisé**\n✅ **Logo et couleurs de votre entreprise**\n✅ **Calcul TVA automatique**\n✅ **Export PDF en 1 clic**\n✅ **Envoi email client automatique**\n\n🎯 **Plus besoin de Word ou Excel !**\n\nRendez-vous dans l'onglet 'Documents' pour tester le générateur !\n\n**Feedback souhaité :** Interface intuitive ? Fonctions manquantes ?";
    }
    
    if (lowerMessage.includes('scan') || lowerMessage.includes('photo')) {
      return "Excellent ! **Scanner intelligent PetitZen** 📸\n\n🔍 **Google Vision AI intégré :**\n✅ Reconnaissance automatique factures\n✅ Extraction montant, date, fournisseur\n✅ Catégorisation intelligente\n✅ Stockage sécurisé cloud\n\n📱 **Compatible smartphone/desktop**\n\n**Test :** Prenez une photo de facture ci-dessous !\n\n**Feedback souhaité :** Qualité reconnaissance ? Vitesse ? Ergonomie ?";
    }
    
    if (lowerMessage.includes('stock') || lowerMessage.includes('gérer')) {
      return "Parfait ! **Gestion stock révolutionnaire** 📦\n\n🚀 **Fonctions innovantes :**\n✅ Scanner code-barre produits\n✅ Alertes seuils personnalisables\n✅ Recommande automatique fournisseur\n✅ Intégration Make.com\n\n💡 **Exemple :** Stock peinture < 5L → Email auto Leroy Merlin\n\nDirection onglet 'Stock' pour tester !\n\n**Feedback souhaité :** Produits à ajouter ? Fournisseurs manquants ?";
    }
    
    if (lowerMessage.includes('banque') || lowerMessage.includes('banking')) {
      return "Top ! **Banking sécurisé PetitZen** 🏦\n\n🔐 **API PSD2 européenne :**\n✅ Connexion sécurisée toutes banques\n✅ Rapprochement automatique\n✅ Dashboard temps réel\n✅ Prévisionnel trésorerie\n\n**Sécurité maximum :** Chiffrement bout en bout, pas de stockage identifiants\n\nOnglet 'Finances' pour voir vos données !\n\n**Feedback souhaité :** Clarté interface ? Infos manquantes ?";
    }
    
    if (lowerMessage.includes('feedback') || lowerMessage.includes('améliorer')) {
      return "**Merci d'être beta-testeur ! 🙏**\n\nVotre feedback est CRUCIAL pour PetitZen !\n\n📝 **Ce qui m'intéresse :**\n• Interface intuitive ?\n• Fonctions manquantes ?\n• Bugs rencontrés ?\n• Idées d'amélioration ?\n• Gain de temps ressenti ?\n\n🎁 **Vos récompenses :**\n✅ 3 mois gratuits\n✅ 6 mois VIP après beta\n✅ Bon Amazon 20€ si feedback complet\n\n**Contact direct :** alex@petitzen.tech";
    }
    
    return "En tant que beta-testeur, vous avez accès à TOUTES les fonctions ! 🚀\n\n**Testez absolument :**\n📸 Scanner de documents\n📄 Générateur PDF\n📦 Gestion stock intelligente\n💳 Banking sécurisé\n📱 Auto-post réseaux sociaux\n📊 Analytics avancés\n\n**Votre mission :** Cassez tout et dites-moi ce qui ne va pas ! 😄\n\nUtilisez les onglets pour explorer chaque fonction !";
  };

  // Continuer avec le reste du code...
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🧘 PetitZen</h1>
          <p className="text-lg text-gray-600">SaaS pour auto-entrepreneurs - Version BETA</p>
          <p className="text-sm text-gray-500 mt-2">Créé par Alex • Réduisez votre budget comptable</p>
        </div>
      </div>
    </div>
  );
};

export default PetitZen;
