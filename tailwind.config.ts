
export default {
content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  theme: {
  
    extend: {
          margin: {
        rtl: {
          "margin-left": "0",
          "margin-right": "16px",
        },
        ltr: {
          "margin-left": "16px",
          "margin-right": "0",
        },
      } 
       ,fontFamily: {
        'custom': ["Urbanist", "sans-serif"],
        'playfair': ["Playfair Display", " serif"],
           'littleone': ["Lilita One", "ans-serif"],
          'poppins': ["Poppins", "sans-serif"],
        
      },
    
    },
  },
   plugins: [
    ('tailwindcss'),
     ('autoprefixer'),
    require('tailwindcss-rtl'),
   ]        
}



