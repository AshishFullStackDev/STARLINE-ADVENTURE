const projectDetails = {
    'mountain-view-zipline': {
        name: 'Mountain View Adventure Resort',
        location: 'Manali, Himachal Pradesh',
        type: 'Zip Line | Resort',
        overview: 'A resort-focused zip line solution planned to add a high-energy experience while respecting the site, guest flow, and operating requirements.',
        activities: 'Zip line system',
        specifications: [['Project type', 'Resort installation'], ['Activity', 'Zip line'], ['Location', 'Manali, Himachal Pradesh'], ['Support', 'Installation and operator guidance']],
        workIntro: 'Starline Adventures supported the project through the key delivery stages, from early site understanding to handover and ongoing support.',
        work: ['Site inspection and feasibility planning', 'Custom layout and equipment design', 'Manufacturing and quality checks', 'Professional installation and safety testing', 'Operator guidance and maintenance support'],
        gallery: [['Preparation', 'images/WhatsApp Image 2026-06-20 at 15.55.44.jpeg'], ['Installation work', 'images/zipline_square.jpeg'], ['Final setup', 'images/sky_cycle_square.jpeg']]
    },
    'adventure-park-rope-course': {
        name: 'Adventure Park India', location: 'Lonavala, Maharashtra', type: 'Rope Course | Adventure Park',
        overview: 'A multi-element rope course designed to give an adventure park a structured, engaging activity with practical operating and safety considerations.',
        activities: 'Multi-level rope course', specifications: [['Project type', 'Adventure park'], ['Activity', 'Rope course'], ['Location', 'Lonavala, Maharashtra'], ['Delivery', 'Design, build, and installation']],
        workIntro: 'Our team translated the park brief into a buildable rope course with a clear installation process and operational handover.',
        work: ['Site inspection and activity planning', 'Custom course design and load planning', 'Equipment manufacturing and finishing', 'Installation, inspection, and safety testing', 'Staff training and maintenance guidance'],
        gallery: [['Site preparation', 'images/WhatsApp Image 2026-06-20 at 15.55.44.jpeg'], ['Installation work', 'images/rope_course_square.jpeg'], ['Final setup', 'images/tower_square.jpeg']]
    },
    'sky-walk-glass-bridge': {
        name: 'Sky Walk Glass Bridge', location: 'Rishikesh, Uttarakhand', type: 'Glass Bridge | Adventure Park',
        overview: 'A glass bridge concept developed for a scenic adventure destination, balancing visitor experience with carefully considered structural and safety requirements.',
        activities: 'Elevated glass bridge', specifications: [['Project type', 'Adventure park'], ['Activity', 'Glass bridge'], ['Location', 'Rishikesh, Uttarakhand'], ['Focus', 'Visitor safety and durability']],
        workIntro: 'Starline Adventures coordinated the technical planning and delivery details required for a safe, memorable elevated walkway.',
        work: ['Site inspection and access review', 'Layout planning and custom detailing', 'Component manufacturing and quality control', 'Installation and safety inspection', 'Operational guidance and maintenance support'],
        gallery: [['Planning reference', 'images/WhatsApp Image 2026-06-20 at 15.55.44.jpeg'], ['Installation work', 'images/glass_square.jpg'], ['Final setup', 'images/Giant swing new.jpeg']]
    },
    'lakeside-giant-swing': {
        name: 'Lakeside Family Resort', location: 'Coorg, Karnataka', type: 'Giant Swing | Resort',
        overview: 'A giant swing installation planned as a signature resort attraction, with attention to visitor movement, equipment reliability, and site conditions.',
        activities: 'Giant swing', specifications: [['Project type', 'Resort installation'], ['Activity', 'Giant swing'], ['Location', 'Coorg, Karnataka'], ['Focus', 'Guest experience and safety']],
        workIntro: 'We worked through the complete delivery cycle to make the installation practical for the resort team and enjoyable for guests.',
        work: ['Site inspection and placement planning', 'Custom design for the resort setting', 'Manufacturing and finish inspection', 'Installation and safety testing', 'Staff training and maintenance support'],
        gallery: [['Preparation', 'images/WhatsApp Image 2026-06-20 at 15.55.44.jpeg'], ['Installation work', 'images/Giant swing.jpeg'], ['Final setup', 'images/Giant swing new.jpeg']]
    },
    'military-training-facility': {
        name: 'Military Training Facility', location: 'Pune, Maharashtra', type: 'Rope Course | Training Facility',
        overview: 'A robust training-focused rope course solution planned around repeated use, structured progression, and dependable equipment performance.',
        activities: 'Commando and rope-course elements', specifications: [['Project type', 'Training facility'], ['Activity', 'Rope course'], ['Location', 'Pune, Maharashtra'], ['Focus', 'Durability and operational safety']],
        workIntro: 'Starline Adventures worked with the facility requirements to deliver a practical installation supported by testing and user guidance.',
        work: ['Site inspection and requirements review', 'Training layout and custom design', 'Manufacturing with quality checks', 'Installation and safety testing', 'Staff training and after-installation support'],
        gallery: [['Site preparation', 'images/WhatsApp Image 2026-06-20 at 15.55.44.jpeg'], ['Installation work', 'images/rope_course_square.jpeg'], ['Final setup', 'images/tower_square.jpeg']]
    },
    'adventure-park-sky-cycle': {
        name: 'Adventure Park Sky Cycle', location: 'Goa', type: 'Sky Cycle | Adventure Park',
        overview: 'An elevated cycling attraction planned to extend the park experience while maintaining a clear and reliable operating system.',
        activities: 'Sky cycle track', specifications: [['Project type', 'Adventure park'], ['Activity', 'Sky cycle'], ['Location', 'Goa'], ['Focus', 'Aerial experience and safe operation']],
        workIntro: 'From initial planning through installation, we focused on a clear visitor route, reliable equipment, and a practical handover for operators.',
        work: ['Site inspection and route planning', 'Custom track and support design', 'Manufacturing and component checks', 'Installation and safety testing', 'Operator training and maintenance guidance'],
        gallery: [['Preparation', 'images/WhatsApp Image 2026-06-20 at 15.55.44.jpeg'], ['Installation work', 'images/sky_cycle_square.jpeg'], ['Final setup', 'images/sky_roller_square.jpeg']]
    },
    'family-resort-kids-zone': {
        name: 'Family Resort Kids Zone', location: 'Shimla, Himachal Pradesh', type: 'Bungee Trampoline | Kids Activity',
        overview: 'A family-focused activity zone planned to offer an engaging experience with age-appropriate equipment and clear safety practices.',
        activities: 'Bungee trampoline and children\'s activities', specifications: [['Project type', 'Kids activity zone'], ['Activity', 'Bungee trampoline'], ['Location', 'Shimla, Himachal Pradesh'], ['Focus', 'Family use and safety']],
        workIntro: 'We helped shape the activity mix and supported the resort team through installation, testing, and operational preparation.',
        work: ['Site inspection and space planning', 'Custom activity selection and design', 'Manufacturing and quality checks', 'Installation and safety testing', 'Staff briefing and maintenance support'],
        gallery: [['Preparation', 'images/WhatsApp Image 2026-06-20 at 15.55.44.jpeg'], ['Installation work', 'images/bungee_square.jpeg'], ['Final setup', 'images/tower_square.jpeg']]
    },
    'school-activity-zone': {
        name: 'School Activity Zone', location: 'Delhi NCR', type: 'Multi Activity Tower | Kids Activity',
        overview: 'A compact multi-activity solution planned for an institutional setting, combining structured play with practical supervision and maintenance needs.',
        activities: 'Multi-activity tower', specifications: [['Project type', 'Institutional activity zone'], ['Activity', 'Multi-activity tower'], ['Location', 'Delhi NCR'], ['Focus', 'Structured play and supervision']],
        workIntro: 'Starline Adventures delivered a coordinated activity solution with attention to usability, installation quality, and staff readiness.',
        work: ['Site inspection and layout planning', 'Custom tower design and safety review', 'Manufacturing and quality control', 'Installation and safety testing', 'Staff training and maintenance guidance'],
        gallery: [['Preparation', 'images/WhatsApp Image 2026-06-20 at 15.55.44.jpeg'], ['Installation work', 'images/tower_square.jpeg'], ['Final setup', 'images/bungee_square.jpeg']]
    }
};

const requestedProject = new URLSearchParams(window.location.search).get('project');
const project = projectDetails[requestedProject] || projectDetails['mountain-view-zipline'];

document.title = `${project.name} | STARLINE ADVENTURES PVT LTD`;
document.getElementById('projectName').textContent = project.name;
document.getElementById('projectType').textContent = project.type;
document.getElementById('projectLocation').textContent = project.location;
document.getElementById('projectOverview').textContent = project.overview;
document.getElementById('projectWorkIntro').textContent = project.workIntro;

document.getElementById('projectSpecs').innerHTML = project.specifications.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join('');
document.getElementById('projectWorkList').innerHTML = project.work.map((item, index) => `<div><strong>${String(index + 1).padStart(2, '0')}</strong><span>${item}</span></div>`).join('');
document.getElementById('projectGallery').innerHTML = project.gallery.map(([label, image]) => `<figure><img src="${image}" alt="${label} for ${project.name}"><figcaption>${label}</figcaption></figure>`).join('');
