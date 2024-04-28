function monthDiff(dateFrom, dateTo) {
    return new Date(dateTo).getMonth() - new Date(dateFrom).getMonth() + 
      (12 * ((new Date(dateTo).getFullYear()) - (new Date(dateFrom).getFullYear())))
}

// Function to calculate weighted Euclidean distance between two profiles
function weightedEuclideanDistance(profile1, profile2, weights) {
    const keys = Object.keys(profile1);
    let sum = 0;
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (typeof profile1[key] === 'number' && typeof profile2[key] === 'number' && weights[key] && !key.includes('importance')) {
            // Add an additional weight to the importance that is given by default
            // Divide by 3 to penalize on a 1-5 scale high numbers, and reward lower important scores
            if (profile1[key + "_importance"]) {
                if (key === 'move_in_date') {
                    sum += weights[key] * Math.pow(monthDiff(profile1[key], profile2[key]), 2);
                } else {
                    sum += weights[key] * (profile1[key + "_importance"] / 3) * Math.pow(profile1[key] - profile2[key], 2);
                }
            } else {
                sum += weights[key] * Math.pow(profile1[key] - profile2[key], 2);
            }
        // Penalize items that have different string values
        } else if (weights[key]) {
            if (profile1[key] !== profile2[key]) {
                sum += weights[key];
            }
        }
    }
    return Math.sqrt(sum);
}

// Function to find k-nearest neighbors with weighted distances
function findNearestNeighbors(profiles, profile, k, weights) {
    const distances = [];
    for (let i = 0; i < profiles.length; i++) {
        const distance = weightedEuclideanDistance(profile, profiles[i], weights);
        distances.push({ index: i, distance: distance });
    }
    distances.sort((a, b) => a.distance - b.distance);
    const nearestNeighbors = [];
    const highest_k = Math.min(k, profiles.length)
    for (let i = 0; i < highest_k; i++) {
        nearestNeighbors.push(profiles[distances[i].index]);
    }
    return nearestNeighbors;
}

function findNearestMatches(profile, allOtherProfiles) {
    const default_weights = { 
        city: 3,
        age: 2,
        sex: 1,
        career: 1,
        university: 1, 
        move_in_date: 2,
        lease_length: 1,
        number_of_roommates: 1,
        budget_range: 1,
        neighborhoods: 1, 
        must_haves: 2,
    };
    const k = 10;
    const nearestNeighbors = findNearestNeighbors(allOtherProfiles, profile, k, default_weights);
    return nearestNeighbors;
}

module.exports = { findNearestMatches };
