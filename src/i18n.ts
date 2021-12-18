import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  fr: {
    translation: {
      RULES: {
        PASSWORD: {
          EIGHT_DIGITS: 'Le mot de passe doit contenir au moins huit caractères.',
          CONFIRM: 'Les deux mots de passe ne sont pas identitques',
        },
      },
      PASSWORD: {
        HINT: 'Mot de passe oublié',
        NEW_PASSWORD_HINT: 'Nouveau Mot de passe',
        EMAIL_SENT_HINT_1: 'Un e-mail a été envoyé à l\'adresse',
        EMAIL_SENT_HINT_2: 'Utilisez le lien pour réinitialiser votre mot de passe.',
        ENTER_NEW_PASSWORD: 'Saisissez un nouveau mot de passe pour votre compte, ',
        ENTER_THE_PASSWORD: 'Saisissez votre mot de passe',
        PASSWORD: 'Mot de passe',
        CONFIRM_PASSWORD: 'Confirmer le nouveau mot de passe',
      },
      REGISTER: {
        HINT: 'Bienvenue sur mydish',
        ENTER_THE_PHONE_NUMBER: 'Saisissez votre numéro de téléphone portable, et nous vous enverrons un code par SMS.',
        PHONE_NUMBER: 'Numéro de téléphone portable',
        ENTER_THE_EMAIL: 'Saisissez votre adresse e-mail',
        EMAIL: 'Adresse e-mail',
        ENTER_YOUR_FULL_NAME: 'Saisissez votre nom complet',
        FAMILY_NAME: 'Prénom',
        NAME: 'Nom',
        ALREADY_HAVE_AN_ACCOUNT: 'Vous avez déjà un compte?',
        GET_CONNECTED: 'connectez-vous',
        CONGRATS: 'Félicitation ',
        ACCOUNT_CREATED_SUCCESSFULLY: 'Votre compte a été créé avec succès.',
        BEGIN_MYDISH_EXPERIENCE: 'Commencer l\'experience mydish',
      },
      LOGIN: {
        HINT: 'Bienvenue à nouveau',
        ENTER_PHONE_NUMBER_OR_EMAIL: 'Connectez-vous avec votre e-mail ou votre numéro de téléphone portable.',
        PHONE_NUMBER_OR_EMAIL: 'E-mail ou numéro de téléphone portable ',
        YOU_ARE_NEW: 'Vous êtes nouveau? ',
        CREATE_ACCOUNT: 'Créez un compte',
        OR: 'Ou',
        CONNECT_WITH_GOOGLE: 'Connectez-vous avec Google',
        CONNECT_WITH_FACEBOOK: 'Connectez-vous avec Facebook',
      },
      SMS_VERIFICATION: {
        ENTER_CODE: 'Saisissez le code envoyé au ',
        FOUR_DIGITS_CODE: 'Code de confirmation à  4 chiffres',
        RESEND_SMS: 'Envoyer à nouveau le code par ',
        SMS: 'SMS',
      },
      HOME: {
        SEARCH_LABEL: 'Réservez le meilleur restaurant et commandez à l\'avance.',
        SEARCH_PLACEHOLDER: 'Saisissez une ville ou un restaurant',
        HOW_TO: {
          LABEL: 'Comment fonctionne Mydish',
          STEPS: {
            STEP1: 'Consultez les menus des restaurants près de chez vous.',
            STEP2: 'Commandez à l\'avance pour la livraison ou réservez une table.',
            STEP3: 'Gagnez du temps et profitez des offres à chaque commande.',
          }
        },
        SLIDES: {
          BOOK_A_TABLE: 'Réservez une table',
          DELIVERY: 'Livraison',
          CHOOSE_YOUR_SPECIALITY: 'Choisissez votre spécialité',
          NEW_ON_MY_DISH: 'Nouveau sur Mydish',
        },
      },
      FOOTER: {
        ABOUT: 'à propos',
        CONTACT: 'Contact',
        ADD_RESTAURANT: 'Ajoutez votre restaurant',
        HELP: 'Obtenir de l\'aide',
        FAQ: 'FAQ',
        SUBSCRIBE_TO_NEWSLETTER: 'Inscrivez-vous à notre newsletter',
        SUBSCRIBE: 'S\'inscrire',
        CONTACT_US_AT: 'Rejoignez-nous sur',
        DOWNLOAD_APP: 'Téléchargez mydish',
        LANGUAGE: {
          FR: 'Français',
          EN: 'English'
        },
        ALL_RIGHTS_RESERVED: '© 2020  Mydish  Tous droits réservés',
        CONFIDENTIALITY: 'Politique de confidentialité',
        CONDITIONS: 'Conditions'
      },
      NAVBAR: {
        GET_CONNECTED: 'Se connecter',
      },
      RESTAURANT_LANDING : {
        DEVELOP: 'Développez votre restaurant',
        WITH_MY_DISH: 'avec Mydish',
        EARN_CLIENTS: 'Gagnez de nouveaux clients et augmentez votre chiffre d’affaires. Inscrivez-vous dès aujourd’hui .',
        OPTIMIZE_ACTIVITY: 'Optimisez votre activité et renforcez la notoriété de votre marque.',
        RECEIVE_COMMANDS: 'Recevez les commandes et et gérez-les facilement sur notre plateforme.',
        PROFIT: {
          TITLE1: 'Optimisez votre activité',
          TITLE2: 'Enchantez vos clients',
          TITLE3: 'Augmentez les ventes ',
          TITLE4: 'Ce que nos partenaires disent de nous',
          TEXT: 'Recevez les commandes et et gérez-les facilement sur notre plateforme. Avec mydish vos clients seront toujours satisfaits. Recevez les commandes et et gérez-les facilement sur notre plateforme. Avec mydish vos clients seront toujours satisfaits. ',
        },
        WHY_MY_DISH: {
          WHY: 'Pourquoi choisir Mydish',
          TITLE1: 'Économisez les ressources',
          TITLE2: 'Optimisez le temps',
          TITLE3: 'Fidéliser les clients',
          TEXT1: 'Fini les blocs de commande, les serveurs à table pendant des minutes. Laissez le client envoyer la commande via Mydish. ',
          TEXT2: 'Améliorez la qualité du service en consacrant toute votre attention aux détails. Mydish s’occupera du reste.',
          TEXT3: 'Construisez une base de données de clients pour communiquer les nouvelles, les promotions ou les événements.',
        },
        PARTNERS: {
          TITLE: 'Ce que nos partenaires disent de nous',
          TEXT: '“Mydish” est la plateforme parfaite pour les dîners animés. Grâce à la réservation et à la précommande, notre restaurant est désormais en mesure de servir les clients même lorsqu’ils sont pressés”. Grâce à la réservation et à la précommande, notre restaurant est désormais en mesure de servir les clients même lorsqu’ils sont pressés”.',
          AUTHOR: 'Marc Eberle',
          ROLE: 'Directeur général chez Les Rupins'
        }
      },
      MARKET: {
        BANNER_TITLE: 'Réservez le meilleur restaurant et commandez à l\'avance.',
        SORT_BY: 'Trier par',
        PRICE: 'Prix',
        DIETETIC: 'Diététique',
        PAGINATION: {
          SPECIAL_OFFER: 'Offres spéciales',
        },
      },
      RESTAURANTS: 'restaurants',
      SEE_MORE: 'Voir plus',
      NEXT: 'Suivant',
      VERIFY: 'Vérifier',
      RETURN_HOME: 'Retour à l\'accueil',
    },
  },
}

i18n.use(initReactI18next)?.init({
  resources,
  lng: 'fr',
  fallbackLng: 'fr',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
