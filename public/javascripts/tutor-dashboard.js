wiseApp.tutorDashBoard = {

    getElements: function() {
      return {
        upcoming: document.getElementById("upcoming"),
        past:     document.getElementById("past"),
        profile:  document.getElementById("profile"),
        subjects: document.getElementById("subjects"),
        availability: document.getElementById("availability")
      }
    },

    showElement : function(element) {
      var elements = this.getElements();
      // remove the hide class
      elements[element].style.display = "block";

      // remove the element form the object
      delete elements[element];
      for(element in elements) {
        elements[element].style.display = "none";
      }
      /*
      $(document).ready(function() {
          // call the tablesorter plugin
          $("table").tablesorter({ sortList: [[0,0]] });
      });*/
    },

    showUpcoming: function() {
      this.showElement('upcoming');
    },

    showPast: function() {
      this.showElement('past');
    },

    showProfile: function() {
      this.showElement('profile');
    },

    showSubjects: function() {
      this.showElement('subjects');
    },

    showAvailabilty: function() {
      this.showElement('availability');
    },

    availabilityModule :  {
      limitEndTime : function() {
        var endTime = document.getElementById("availabilityEndTime"),
            value   = document.getElementById("availabilityStartTime").selectedIndex,
            flag    = false;

        $('#availabilityEndTime option').each(function() {
          if($(this)[0].index < value) {
            $(this).hide();
          } else {
            $(this).show();
          }
        });
        $('#availabilityEndTime option')[0].selected = 'selected';
      },

      addAvailability : function() {
        var table       = document.getElementById("availabilityTable"),
            hidden      = document.getElementById("availabilityHidden"),
            startTime   = document.getElementById("availabilityStartTime"),
            day         = document.getElementById("availabilityDay"),
            endTime     = document.getElementById("availabilityEndTime"),
            tr          = document.createElement("tr"),
            dayTd       = document.createElement("td"),
            startTimeTd = document.createElement("td"),
            endTimeTd   = document.createElement("td"),
            dayText     = document.createTextNode(day.value),
            startText   = document.createTextNode(startTime.value),
            endText     = document.createTextNode(endTime.value)
            dayInput    = document.createElement("input"),
            startInput  = document.createElement("input"),
            endInput    = document.createElement("input");

            dayInput.type = "hidden";
            dayInput.value = day.value;
            dayInput.name = "day[]";

            startInput.type = "hidden";
            startInput.value = startTime.value;
            startInput.name = "start[]";

            endInput.type = "hidden";
            endInput.value = endTime.value;
            endInput.name = "end[]";

            dayTd.appendChild(dayText);
            startTimeTd.appendChild(startText);
            endTimeTd.appendChild(endText);

            tr.appendChild(dayTd);
            tr.appendChild(startTimeTd);
            tr.appendChild(endTimeTd);

            table.appendChild(tr);
            hidden.appendChild(dayInput);
            hidden.appendChild(startInput);
            hidden.appendChild(endInput);
      },

      getNumberOfDay : function(day) {
        switch (day) {
          case "Monday" : return 0; break;
          case "Tuesday" : return 1; break;
          case "Wednesday" : return 2; break;
          case "Thursday" : return 3; break;
          case "Friday" : return 4; break;
          case "Saturday" : return 5; break;
          case "Sunday" : return 6; break;
          default: break;
        }
      }
    }
}
