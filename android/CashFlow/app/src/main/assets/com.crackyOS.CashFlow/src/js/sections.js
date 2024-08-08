function show_section(section) {
    const sections = ['mainSection', 'historySection', 'increaseSection', 'decreaseSection', 'pinSection', 'debugSection'];
    
    sections.forEach(sec => {
        const element = document.getElementById(sec);
        if (sec === section) {
            element.classList.add("active");
        } else {
            element.classList.remove("active");
        }
    });
    document.getElementById("masterTitle").innerHTML = `CashFlow <i><small><small><small>[${section}]</small></small></small></i>`;
}
