fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const d = data["UT Debt Clock"];

    function parseNum(str) {
      return parseFloat(str.replace(/[^0-9.]/g, ''));
    }

    function formatDollar(num) {
      return '$' + Math.floor(num).toLocaleString();
    }

    function formatComma(num) {
      return Math.floor(num).toLocaleString();
    }

    function formatPercent(num) {
      return num.toFixed(2) + '%';
    }

    // Static values
    document.getElementById('year-1960').textContent = d["1960 %"];
    document.getElementById('year-1980').textContent = d["1980 %"];
    document.getElementById('year-2000').textContent = d["2000 %"];

    // Debt Per Student (needed for Total Student Debt calculation)
    const debtPerStudent = parseNum(d["Debt Per Student;"]);
    const totalStudentDebt = debtPerStudent * 550000;

    // Counters object: id -> { current, increment, format }
    const counters = {
      'ut-total-debt':          { current: parseNum(d["UT Total Debt"]),          increment: 1432,   format: formatDollar },
      'seniors-dating-freshman':{ current: parseNum(d["Seniors Dating Freshman"]), increment: 0.5,   format: formatComma  },
      'fracking-costs':         { current: parseNum(d["Fracking Costs"]),          increment: 1,   format: formatDollar },
      'tower-renovation-budget':{ current: parseNum(d["Tower Renovation Budget"]), increment: 14,   format: formatDollar },
      'expired-bevo-bucks':     { current: parseNum(d["Expired Bevo Bucks"]),      increment: 1,   format: formatDollar },
      'total-student-debt':     { current: totalStudentDebt,                       increment: 1,   format: formatDollar },
      'debt-per-student':       { current: debtPerStudent,                         increment: 1,   format: formatDollar },
      'year-now':               { current: parseNum(d["Now %"]),                   increment: 0.03, format: formatPercent },
    };

    function animate() {
      for (const id in counters) {
        const c = counters[id];
        c.current += c.increment;
        document.getElementById(id).textContent = c.format(c.current);
      }
      setTimeout(animate, 50);
    }

    animate();
  });
