import { teamData } from './people_data.js';

const createPlaceholderSVG = () => {
    return `
        <div class="text-center p-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-gray-400">Member Photo</p>
        </div>
    `;
};

const renderFaculty = (container) => {
    const faculty = teamData.faculty[0];
    if (!faculty) return;

    const memberCard = `
        <div class="team-member-card bg-dark-surface rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 max-w-2xl w-full">
            <div class="md:flex">
                <div class="md:flex-shrink-0 md:w-64 flex items-center justify-center bg-dark border-b md:border-b-0 md:border-r border-gray-700">
                    <img src="public/Myra-Fernandes-RIA-photo-683x1024 (1).gif" alt="Dr. Myra A. Fernandes" class="object-cover h-64 w-64 rounded-lg shadow-md" />
                </div>
                <div class="p-8">
                    <h4 class="text-2xl font-bold text-primary mb-2">${faculty.name}</h4>
                    <p class="text-lg text-secondary font-medium mb-4">${faculty.title}</p>
                    <p class="text-sm text-gray-300 mb-2"><span class="font-semibold">Education:</span> ${faculty.education}</p>
                    <p class="text-sm text-gray-300 mb-4">${faculty.description}</p>
                    <div class="flex space-x-3 mt-4">
                        <a href="${faculty.profile_url}" class="text-primary hover:underline text-sm font-medium">View Full Profile</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    container.innerHTML = memberCard;
};

const renderGraduateStudents = (container) => {
    let content = '';
    teamData.graduateStudents.forEach(student => {
        let photoContent = '';
        
        // Use actual photos for specific students
        if (student.name === "Yadurshana Sivashankar") {
            photoContent = `<img src="public/yadurshana-sivashankar_photo (1).png" alt="${student.name}" class="object-cover h-48 w-full rounded-t-lg" />`;
        } else if (student.name === "Sophia Tran") {
            photoContent = `<img src="public/sophiatran.png" alt="${student.name}" class="object-cover h-48 w-full rounded-t-lg" />`;
        } else {
            photoContent = `
                <div class="text-center p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14 mx-auto text-gray-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p class="text-gray-400 text-xs">Student Photo</p>
                </div>
            `;
        }
        
        content += `
            <div class="team-member-card bg-dark rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 flex flex-col h-full">
                <div class="team-photo-container h-48 bg-dark-surface flex items-center justify-center border-b border-gray-700">
                    ${photoContent}
                </div>
                <div class="p-5 flex-grow flex flex-col">
                    <h4 class="text-lg font-bold text-primary mb-1">${student.name}</h4>
                    <p class="text-sm text-secondary font-medium mb-3">${student.title}</p>
                    <div class="text-sm text-gray-300 space-y-2 mb-4 flex-grow">
                        <p><span class="font-semibold">Program:</span> ${student.program}</p>
                        <p><span class="font-semibold">Education:</span> ${student.education}</p>
                        <p><span class="font-semibold">Interests:</span> ${student.interests}</p>
                    </div>
                    ${student.contact ? `<a href="mailto:${student.contact}" class="text-primary hover:underline text-xs font-medium self-start mt-auto">Contact</a>` : ''}
                </div>
            </div>
        `;
    });
    container.innerHTML = content;
};

const renderUndergraduateResearchers = (container) => {
    let content = '';
    teamData.undergraduateStudents.forEach(group => {
        content += `<div class="mb-10">\n            <h4 class="text-xl font-bold text-primary mb-6 text-center">${group.category}</h4>`;

        if (group.category.includes("Honours Thesis")) {
            const student = group.students[0];
            content += `
             <div class="max-w-md mx-auto team-member-card bg-dark-surface rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 flex flex-col h-full">
                <div class="p-5 flex-grow flex flex-col text-center">
                    <h4 class="text-lg font-bold text-primary mb-1">${student.name}</h4>
                    <p class="text-sm text-secondary font-medium mb-3">${student.program}</p>
                    <div class="text-sm text-gray-300 space-y-2 mb-4 flex-grow">
                        <p><span class="font-semibold">Education:</span> ${student.education}</p>
                        <p><span class="font-semibold">Interests:</span> ${student.interests}</p>
                    </div>
                </div>
            </div>
            `;
        } else {
            content += `<div class="bg-dark-surface p-8 rounded-lg shadow-lg">\n                <ul class="space-y-3 text-gray-300">`;
            group.students.forEach(student => {
                content += `
                    <li class="flex items-start">
                        <span class="h-2 w-2 bg-secondary rounded-full mr-3 mt-2 flex-shrink-0"></span>
                        <div>
                            <span class="font-bold text-gray-100">${student.name}:</span>
                            <span class="text-gray-400">${student.interests}</span>
                        </div>
                    </li>`;
            });
            content += `</ul></div>`;
        }
        content += `</div>`;
    });
    container.innerHTML = content;
};

const renderResearchAssistants = (container) => {
    let content = `<div class="bg-dark p-8 rounded-lg shadow-lg">\n                        <ul class="space-y-3 text-gray-300">`;
    teamData.researchAssistants.forEach(ra => {
         content += `
            <li class="flex items-start">
                <span class="h-2 w-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></span>
                <div>
                    <span class="font-bold text-gray-100">${ra.name}:</span>
                    <span class="text-gray-400"> ${ra.interests}</span>
                </div>
            </li>`;
    });
    content += `</ul></div>`;
    container.innerHTML = content;
};

const renderSimpleList = (container, data, iconColorClass) => {
    if (!data || data.length === 0) return;
    let content = `<div class="bg-dark-surface p-8 rounded-lg shadow-lg"><ul class="space-y-4 text-gray-300">`;
    data.forEach(item => {
        content += `
            <li class="flex items-start">
                <span class="h-2 w-2 ${iconColorClass} rounded-full mr-4 mt-2 flex-shrink-0"></span>
                <p>${item}</p>
            </li>
        `;
    });
    content += `</ul></div>`;
    container.innerHTML = content;
};

const renderUndergraduateAlumni = (container) => {
    if (!teamData.undergraduateAlumni || teamData.undergraduateAlumni.length === 0) return;
    
    let content = `<div class="bg-dark-surface p-8 rounded-lg shadow-lg">`;
    content += `<div class="overflow-x-auto">`;
    content += `<table class="w-full text-left">`;
    content += `<thead><tr class="border-b border-gray-600">`;
    content += `<th class="py-3 px-4 text-primary font-semibold">Year</th>`;
    content += `<th class="py-3 px-4 text-primary font-semibold">Student Name</th>`;
    content += `<th class="py-3 px-4 text-primary font-semibold">Topic</th>`;
    content += `</tr></thead><tbody>`;
    
    teamData.undergraduateAlumni.forEach(alumni => {
        content += `<tr class="border-b border-gray-700 hover:bg-dark">`;
        content += `<td class="py-3 px-4 text-secondary font-medium">${alumni.year}</td>`;
        content += `<td class="py-3 px-4 text-gray-100 font-medium">${alumni.name}</td>`;
        content += `<td class="py-3 px-4 text-gray-300">${alumni.topic}</td>`;
        content += `</tr>`;
    });
    
    content += `</tbody></table></div></div>`;
    container.innerHTML = content;
};

const renderGraduateAlumni = (container) => {
    if (!teamData.graduateAlumni || teamData.graduateAlumni.length === 0) return;
    
    let content = '';
    teamData.graduateAlumni.forEach(alumni => {
        content += `
            <div class="team-member-card bg-dark rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105 flex flex-col h-full">
                <div class="team-photo-container h-48 bg-dark-surface flex items-center justify-center border-b border-gray-700">
                    <div class="text-center p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14 mx-auto text-gray-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p class="text-gray-400 text-xs">Alumni Photo</p>
                    </div>
                </div>
                <div class="p-5 flex-grow flex flex-col">
                    <h4 class="text-lg font-bold text-primary mb-1">${alumni.name}</h4>
                    <p class="text-sm text-secondary font-medium mb-3">${alumni.program}</p>
                    <div class="text-sm text-gray-300 space-y-2 mb-4 flex-grow">
                        <p><span class="font-semibold">Research:</span> ${alumni.research}</p>
                    </div>
                </div>
            </div>
        `;
    });
    
    content = `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">${content}</div>`;
    container.innerHTML = content;
};

document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main') || document.body;
    // Insert lab group photo section at the top
    const labPhotoSection = document.createElement('section');
    labPhotoSection.className = 'py-12 px-6 bg-dark-surface';
    labPhotoSection.innerHTML = `
        <div class="container mx-auto text-center mb-8">
            <h2 class="text-3xl font-bold mb-4 text-primary">Lab Group Photo 2024</h2>
            <img src="public/IMG_2987.jpg" alt="Lab Group Photo 2024" class="mx-auto rounded-lg shadow-lg max-w-2xl w-full object-cover mb-4" />
        </div>
    `;
    main.prepend(labPhotoSection);

    const facultyContainer = document.getElementById('faculty-container');
    const gradStudentsContainer = document.getElementById('graduate-students-container');
    const undergradContainer = document.getElementById('undergraduate-researchers-container');
    const raContainer = document.getElementById('research-assistants-container');
    const gradAwardsContainer = document.getElementById('graduate-awards-container');
    const undergradAwardsContainer = document.getElementById('undergraduate-awards-container');
    const placementsContainer = document.getElementById('placements-container');
    const undergraduateAlumniContainer = document.getElementById('undergraduate-alumni-container');
    const graduateAlumniContainer = document.getElementById('graduate-alumni-container');

    if (facultyContainer) renderFaculty(facultyContainer);
    if (gradStudentsContainer) renderGraduateStudents(gradStudentsContainer);
    if (undergradContainer) renderUndergraduateResearchers(undergradContainer);
    if (raContainer) renderResearchAssistants(raContainer);
    if (undergraduateAlumniContainer) renderUndergraduateAlumni(undergraduateAlumniContainer);
    if (graduateAlumniContainer) renderGraduateAlumni(graduateAlumniContainer);

    if (gradAwardsContainer) renderSimpleList(gradAwardsContainer, teamData.graduateStudentAwards, 'bg-primary');
    if (undergradAwardsContainer) renderSimpleList(undergradAwardsContainer, teamData.undergraduateStudentAwards, 'bg-secondary');
    if (placementsContainer) renderSimpleList(placementsContainer, teamData.pastGraduatePlacements, 'bg-primary');
});
