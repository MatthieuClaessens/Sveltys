document.addEventListener('DOMContentLoaded', () => {
    // Gestion du menu mobile
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Calcul de l'IMC
    const calculateBtn = document.getElementById('calculateBtn');
    const resultNumber = document.getElementById('resultnumber');
    const resultState = document.getElementById('resultstate');
    const form = document.getElementById('imcForm');
    const resultDiv = document.getElementById('result');
    const imcValue = document.getElementById('imcValue');
    const imcCategory = document.getElementById('imcCategory');
    const imcCircle = document.getElementById('imcCircle');
    const imcProgress = document.getElementById('imcProgress');
    const imcDescription = document.getElementById('imcDescription');
    const simpleResult = document.getElementById('simpleResult');

    const calculateIMC = (e) => {
        e.preventDefault();
        const h = parseFloat(document.getElementById('height').value);
        const w = parseFloat(document.getElementById('weight').value);

        if (!h || h < 50 || !w || w < 10) {
            if (resultNumber) {
                resultNumber.classList.remove('text-black');
                resultNumber.classList.add('text-red-600');
                resultNumber.innerHTML = `Erreur : veuillez saisir une taille d'au moins 50 cm et un poids d'au moins 10 kg.`;
                resultState.innerHTML = '';
                simpleResult.classList.remove('hidden');
            }
            return;
        }

        const meterconversion = (h / 100) * (h / 100);
        const imc = w / meterconversion;

        const IMCState = (imc < 18.5) ? "Maigreur" :
            (imc >= 18.5 && imc < 25) ? "Corpulence normale" :
                (imc >= 25 && imc < 30) ? "Surpoids" :
                    (imc >= 30 && imc < 35) ? "Obésité modérée" :
                        (imc >= 35 && imc < 40) ? "Obésité sévère" :
                            "Obésité morbide";

        let category = '';
        let color = '';
        let gradientFrom = '';
        let gradientTo = '';
        let description = '';
        let progressWidth = '';

        if (imc < 18.5) {
            category = 'Insuffisance pondérale';
            gradientFrom = 'from-blue-400';
            gradientTo = 'to-cyan-400';
            color = 'text-cyan-400';
            description = 'Votre IMC indique une insuffisance pondérale. Il est recommandé de consulter un professionnel de santé pour un conseil personnalisé.';
            progressWidth = (imc / 18.5 * 25) + '%';
        } else if (imc < 25) {
            category = 'Poids normal';
            gradientFrom = 'from-emerald-400';
            gradientTo = 'to-green-400';
            color = 'text-emerald-400';
            description = 'Excellent ! Votre IMC se situe dans la zone de poids normal. Continuez à maintenir un mode de vie sain.';
            progressWidth = (25 + ((imc - 18.5) / 6.5 * 25)) + '%';
        } else if (imc < 30) {
            category = 'Surpoids';
            gradientFrom = 'from-yellow-400';
            gradientTo = 'to-orange-400';
            color = 'text-orange-400';
            description = 'Votre IMC indique un surpoids. Pensez à adopter une alimentation équilibrée et une activité physique régulière.';
            progressWidth = (50 + ((imc - 25) / 5 * 25)) + '%';
        } else {
            category = 'Obésité';
            gradientFrom = 'from-red-400';
            gradientTo = 'to-pink-400';
            color = 'text-red-400';
            description = 'Votre IMC indique une obésité. Il est fortement recommandé de consulter un professionnel de santé pour un accompagnement adapté.';
            progressWidth = Math.min((75 + ((imc - 30) / 10 * 25)), 100) + '%';
        }

        // Affichage simple
        if (resultNumber && resultState) {
            resultNumber.classList.remove('text-red-600');
            resultNumber.classList.add('text-black');
            resultNumber.innerHTML = `Votre IMC est = ${imc.toFixed(2)}`;
            resultState.innerHTML = IMCState;
            simpleResult.classList.remove('hidden');
        }

        // Affichage visuel
        if (resultDiv && imcValue && imcCategory && imcCircle && imcProgress && imcDescription) {
            imcValue.textContent = imc.toFixed(1);
            imcCategory.textContent = category;
            imcCategory.className = `text-2xl font-bold mt-4 ${color}`;
            imcCircle.className = `w-40 h-40 mx-auto rounded-full flex items-center justify-center mb-4 relative overflow-hidden bg-gradient-to-br ${gradientFrom} ${gradientTo}`;
            imcProgress.className = `h-full transition-all duration-1000 ease-out rounded-full bg-gradient-to-r ${gradientFrom} ${gradientTo}`;
            imcProgress.style.width = progressWidth;
            imcDescription.textContent = description;
            resultDiv.classList.remove('hidden');
            resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    };

    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateIMC);
    }

    if (form) {
        form.addEventListener('submit', calculateIMC);
    }
});