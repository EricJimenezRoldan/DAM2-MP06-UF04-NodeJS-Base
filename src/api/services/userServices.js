// userServices.js

/**
 * Calcula l'edat mitjana dels usuaris proporcionats.
 * @param {Array} users - Un array d'objectes on cada objecte representa un usuari i conté una propietat `birthDate`.
 * @returns {Number} L'edat mitjana dels usuaris, o 0 si no hi ha usuaris.
 */
function calculateAverageAge(users) {
  const totalAge = users.reduce((acc, user) => {
    const birthDate = new Date(user.birthDate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const birthMonth = birthDate.getMonth();
    const todayMonth = today.getMonth();

    // Comprova si ja s'ha celebrat l'aniversari d'aquest any
    if (todayMonth < birthMonth || (todayMonth === birthMonth && today.getDate() < birthDate.getDate())) {
      age--; // Resta un any si encara no s'ha celebrat l'aniversari
    }

    return acc + age;
  }, 0);

  return users.length > 0 ? totalAge / users.length : 0;
}


// Exporta la funció `calculateAverageAge` perquè pugui ser utilitzada en altres parts de l'aplicació.
module.exports = { calculateAverageAge };
