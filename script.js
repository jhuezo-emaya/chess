(function() {
  // format duration as string
  var displayTime, getTimeString, resetButtonClasses, toggleButtons;

  getTimeString = function(time) {
    var secs;
    secs = time.get('seconds');
    if (secs < 10) {
      secs = `0${secs}`;
    }
    return `${time.get('minutes')}:${secs}`;
  };

  
  // toggle classes and disabled props of buttons
  toggleButtons = function(elem) {
    if (elem === "right") {
      // props
      $("#left .toggle").prop("disabled", false);
      $("#right .toggle").prop("disabled", true);
      
      // classes
      $("#right .toggle").addClass("btn-default btn-disabled");
      $("#right .toggle").removeClass("btn-primary");
      return $("#left .toggle").addClass("btn-primary");
    } else if (elem === "left") {
      // props
      $("#left .toggle").prop("disabled", true);
      $("#right .toggle").prop("disabled", false);
      
      // classes
      $("#left .toggle").addClass("btn-default btn-disabled");
      $("#left .toggle").removeClass("btn-primary");
      return $("#right .toggle").addClass("btn-primary");
    }
  };

  
  // restores both toggles to original state
  resetButtonClasses = function() {
    $("#left input").addClass("btn-primary");
    $("#left input").removeClass("btn-default btn-disabled");
    $("#right input").addClass("btn-primary");
    return $("#right input").removeClass("btn-default btn-disabled");
  };

  
  // change the time shown on page
  displayTime = function(elem, time) {
    return $(elem).html(getTimeString(time));
  };

  
  // doc ready
  jQuery(function($) {
    var leftTimer, resetAll, rightTimer, t1, t2;
    // init timers
    t1 = moment.duration(20, "minutes");
    t2 = moment.duration(20, "minutes");
    displayTime("#left .time", t1);
    displayTime("#right .time", t2);
    
    // set right timer
    rightTimer = $('#right .toggle').on('click', function() {
      
      // pause other timer
      if (leftTimer) {
        clearInterval(leftTimer);
        toggleButtons("right");
      }
      return rightTimer = setInterval(function() {
        if (t2.as('seconds') > 0) {
          t2.subtract(moment.duration(1, 's'));
          return displayTime("#right .time", t2);
        } else {
          return clearInterval(self);
        }
      }, 1000);
    });
    
    // set left timer
    leftTimer = $('#left .toggle').on('click', function() {
      if (rightTimer) {
        clearInterval(rightTimer);
        toggleButtons("left");
      }
      return leftTimer = setInterval(function() {
        if (t1.as('seconds') > 0) {
          t1.subtract(moment.duration(1, 's'));
          return displayTime("#left .time", t1);
        } else {
          return clearInterval(self);
        }
      }, 1000);
    });
    
    // pause timer for active player
    $("#pause").on('click', function() {
      if ($("#left .toggle").prop === "disabled") {
        toggleButtons("left");
      } else {
        toggleButtons("right");
      }
      clearInterval(leftTimer);
      return clearInterval(rightTimer);
    });
    
    // reset both timers and toggles
    $("#reset").on('click', function() {
      $('#time-input').val(20);
      return resetAll(20);
    });
    $('#time-input').on('change', function() {
      return resetAll(parseInt($('#time-input').val()));
    });
    return resetAll = function(minutes) {
      clearInterval(leftTimer);
      clearInterval(rightTimer);
      t1 = moment.duration(minutes, "minutes");
      t2 = moment.duration(minutes, "minutes");
      displayTime("#left .time", t1);
      displayTime("#right .time", t2);
      
      // reset disabled property
      $("#left input").prop("disabled", false);
      $("#right input").prop("disabled", false);
      
      // reset button classes
      return resetButtonClasses();
    };
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQTJCO0VBQUE7QUFBQSxNQUFBLFdBQUEsRUFBQSxhQUFBLEVBQUEsa0JBQUEsRUFBQTs7RUFDM0IsYUFBQSxHQUFnQixRQUFBLENBQUMsSUFBRCxDQUFBO0FBQ2hCLFFBQUE7SUFBRSxJQUFBLEdBQU8sSUFBSSxDQUFDLEdBQUwsQ0FBUyxTQUFUO0lBQ1AsSUFBRyxJQUFBLEdBQU8sRUFBVjtNQUNFLElBQUEsR0FBTyxDQUFBLENBQUEsQ0FBQSxDQUFJLElBQUosQ0FBQSxFQURUOztXQUVBLENBQUEsQ0FBQSxDQUFHLElBQUksQ0FBQyxHQUFMLENBQVMsU0FBVCxDQUFILENBQUEsQ0FBQSxDQUFBLENBQTBCLElBQTFCLENBQUE7RUFKYyxFQURXOzs7O0VBUTNCLGFBQUEsR0FBZ0IsUUFBQSxDQUFDLElBQUQsQ0FBQTtJQUNkLElBQUcsSUFBQSxLQUFRLE9BQVg7O01BRUUsQ0FBQSxDQUFFLGVBQUYsQ0FBa0IsQ0FBQyxJQUFuQixDQUF3QixVQUF4QixFQUFvQyxLQUFwQztNQUNBLENBQUEsQ0FBRSxnQkFBRixDQUFtQixDQUFDLElBQXBCLENBQXlCLFVBQXpCLEVBQXFDLElBQXJDLEVBRko7OztNQUtJLENBQUEsQ0FBRSxnQkFBRixDQUFtQixDQUFDLFFBQXBCLENBQTZCLDBCQUE3QjtNQUNBLENBQUEsQ0FBRSxnQkFBRixDQUFtQixDQUFDLFdBQXBCLENBQWdDLGFBQWhDO2FBQ0EsQ0FBQSxDQUFFLGVBQUYsQ0FBa0IsQ0FBQyxRQUFuQixDQUE0QixhQUE1QixFQVJGO0tBQUEsTUFTSyxJQUFHLElBQUEsS0FBUSxNQUFYOztNQUVILENBQUEsQ0FBRSxlQUFGLENBQWtCLENBQUMsSUFBbkIsQ0FBd0IsVUFBeEIsRUFBb0MsSUFBcEM7TUFDQSxDQUFBLENBQUUsZ0JBQUYsQ0FBbUIsQ0FBQyxJQUFwQixDQUF5QixVQUF6QixFQUFxQyxLQUFy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KHRpbWUpIC0+XG4gIHNlY3MgPSB0aW1lLmdldCgnc2Vjb25kcycpXG4gIGlmIHNlY3MgPCAxMFxuICAgIHNlY3MgPSBcIjAje3NlY3N9XCJcbiAgXCIje3RpbWUuZ2V0KCdtaW51dGVzJyl9OiN7c2Vjc31cIiAgXG5cbiMgdG9nZ2xlIGNsYXNzZXMgYW5kIGRpc2FibGVkIHByb3BzIG9mIGJ1dHRvbnNcbnRvZ2dsZUJ1dHRvbnMgPSAoZWxlbSkgLT5cbiAgaWYgZWxlbSBpcyBcInJpZ2h0XCJcbiAgICAjIHByb3BzXG4gICAgJChcIiNsZWZ0IC50b2dnbGVcIikucHJvcCBcImRpc2FibGVkXCIsIGZhbHNlXG4gICAgJChcIiNyaWdodCAudG9nZ2xlXCIpLnByb3AgXCJkaXNhYmxlZFwiLCB0cnVlXG4gICAgXG4gICAgIyBjbGFzc2VzXG4gICAgJChcIiNyaWdodCAudG9nZ2xlXCIpLmFkZENsYXNzIFwiYnRuLWRlZmF1bHQgYnRuLWRpc2FibGVkXCJcbiAgICAkKFwiI3JpZ2h0IC50b2dnbGVcIikucmVtb3ZlQ2xhc3MgXCJidG4tcHJpbWFyeVwiXG4gICAgJChcIiNsZWZ0IC50b2dnbGVcIikuYWRkQ2xhc3MgXCJidG4tcHJpbWFyeVwiXG4gIGVsc2UgaWYgZWxlbSBpcyBcImxlZnRcIlxuICAgICMgcHJvcHNcbiAgICAkKFwiI2xlZnQgLnRvZ2dsZVwiKS5wcm9wIFwiZGlzYWJsZWRcIiwgdHJ1ZVxuICAgICQoXCIjcmlnaHQgLnRvZ2dsZVwiKS5wcm9wIFwiZGlzYWJsZWRcIiwgZmFsc2VcbiAgICBcbiAgICAjIGNsYXNzZXNcbiAgICAkKFwiI2xlZnQgLnRvZ2dsZVwiKS5hZGRDbGFzcyBcImJ0bi1kZWZhdWx0IGJ0bi1kaXNhYmxlZFwiXG4gICAgJChcIiNsZWZ0IC50b2dnbGVcIikucmVtb3ZlQ2xhc3MgXCJidG4tcHJpbWFyeVwiXG4gICAgJChcIiNyaWdodCAudG9nZ2xlXCIpLmFkZENsYXNzIFwiYnRuLXByaW1hcnlcIlxuICBcbiMgcmVzdG9yZXMgYm90aCB0b2dnbGVzIHRvIG9yaWdpbmFsIHN0YXRlXG5yZXNldEJ1dHRvbkNsYXNzZXMgPSAtPlxuICAkKFwiI2xlZnQgaW5wdXRcIikuYWRkQ2xhc3MgXCJidG4tcHJpbWFyeVwiXG4gICQoXCIjbGVmdCBpbnB1dFwiKS5yZW1vdmVDbGFzcyBcImJ0bi1kZWZhdWx0IGJ0bi1kaXNhYmxlZFwiXG4gICQoXCIjcmlnaHQgaW5wdXRcIikuYWRkQ2xhc3MgXCJidG4tcHJpbWFyeVwiXG4gICQoXCIjcmlnaHQgaW5wdXRcIikucmVtb3ZlQ2xhc3MgXCJidG4tZGVmYXVsdCBidG4tZGlzYWJsZWRcIlxuICBcbiMgY2hhbmdlIHRoZSB0aW1lIHNob3duIG9uIHBhZ2VcbmRpc3BsYXlUaW1lID0gKGVsZW0sIHRpbWUpIC0+XG4gICQoZWxlbSkuaHRtbChnZXRUaW1lU3RyaW5nIHRpbWUpICBcblxuIyBkb2MgcmVhZHlcbmpRdWVyeSAoJCkgLT5cbiAgIyBpbml0IHRpbWVyc1xuICB0MSA9IG1vbWVudC5kdXJhdGlvbigyMCwgXCJtaW51dGVzXCIpXG4gIHQyID0gbW9tZW50LmR1cmF0aW9uKDIwLCBcIm1pbnV0ZXNcIilcbiAgZGlzcGxheVRpbWUgXCIjbGVmdCAudGltZVwiLCB0MVxuICBkaXNwbGF5VGltZSBcIiNyaWdodCAudGltZVwiLCB0MlxuICBcbiAgIyBzZXQgcmlnaHQgdGltZXJcbiAgcmlnaHRUaW1lciA9ICQoJyNyaWdodCAudG9nZ2xlJykuIG9uICdjbGljaycsIC0+IFxuICAgICMgcGF1c2Ugb3RoZXIgdGltZXJcbiAgICBpZiBsZWZ0VGltZXJcbiAgICAgIGNsZWFySW50ZXJ2YWwobGVmdFRpbWVyKVxuICAgICAgdG9nZ2xlQnV0dG9ucyhcInJpZ2h0XCIpXG4gICAgXG4gICAgcmlnaHRUaW1lciA9IHNldEludGVydmFsIC0+IFxuICAgICAgaWYgdDIuYXMoJ3NlY29uZHMnKSA+IDBcbiAgICAgICAgdDIuc3VidHJhY3QgbW9tZW50LmR1cmF0aW9uKDEsICdzJylcbiAgICAgICAgZGlzcGxheVRpbWUgXCIjcmlnaHQgLnRpbWVcIiwgdDJcbiAgICAgIGVsc2VcbiAgICAgICAgY2xlYXJJbnRlcnZhbCBzZWxmXG4gICAgLCAxMDAwXG4gICAgXG4gICMgc2V0IGxlZnQgdGltZXJcbiAgbGVmdFRpbWVyID0gJCgnI2xlZnQgLnRvZ2dsZScpLiBvbiAnY2xpY2snLCAtPiBcbiAgICBpZiByaWdodFRpbWVyXG4gICAgICBjbGVhckludGVydmFsKHJpZ2h0VGltZXIpXG4gICAgICB0b2dnbGVCdXR0b25zKFwibGVmdFwiKVxuICAgIFxuICAgIGxlZnRUaW1lciA9IHNldEludGVydmFsIC0+IFxuICAgICAgaWYgdDEuYXMoJ3NlY29uZHMnKSA+IDBcbiAgICAgICAgdDEuc3VidHJhY3QgbW9tZW50LmR1cmF0aW9uKDEsICdzJylcbiAgICAgICAgZGlzcGxheVRpbWUgXCIjbGVmdCAudGltZVwiLCB0MVxuICAgICAgZWxzZVxuICAgICAgICBjbGVhckludGVydmFsIHNlbGZcbiAgICAsIDEwMDBcbiAgXG4gICMgcGF1c2UgdGltZXIgZm9yIGFjdGl2ZSBwbGF5ZXJcbiAgJChcIiNwYXVzZVwiKS5vbiAnY2xpY2snLCAtPlxuICAgIGlmICQoXCIjbGVmdCAudG9nZ2xlXCIpLnByb3AgaXMgXCJkaXNhYmxlZFwiXG4gICAgICB0b2dnbGVCdXR0b25zKFwibGVmdFwiKVxuICAgIGVsc2VcbiAgICAgIHRvZ2dsZUJ1dHRvbnMoXCJyaWdodFwiKVxuICAgIFxuICAgIGNsZWFySW50ZXJ2YWwobGVmdFRpbWVyKVxuICAgIGNsZWFySW50ZXJ2YWwocmlnaHRUaW1lcilcbiAgXG4gICMgcmVzZXQgYm90aCB0aW1lcnMgYW5kIHRvZ2dsZXNcbiAgJChcIiNyZXNldFwiKS5vbiAnY2xpY2snLCAtPlxuICAgICQoJyN0aW1lLWlucHV0JykudmFsKDIwKVxuICAgIHJlc2V0QWxsKDIwKVxuICBcbiAgJCgnI3RpbWUtaW5wdXQnKS5vbiAnY2hhbmdlJywgLT5cbiAgICByZXNldEFsbChwYXJzZUludCgkKCcjdGltZS1pbnB1dCcpLnZhbCgpKSlcbiAgICBcbiAgcmVzZXRBbGwgPSAobWludXRlcykgLT5cbiAgICBjbGVhckludGVydmFsKGxlZnRUaW1lcilcbiAgICBjbGVhckludGVydmFsKHJpZ2h0VGltZXIpXG4gICAgdDEgPSBtb21lbnQuZHVyYXRpb24obWludXRlcywgXCJtaW51dGVzXCIpXG4gICAgdDIgPSBtb21lbnQuZHVyYXRpb24obWludXRlcywgXCJtaW51dGVzXCIpXG4gICAgZGlzcGxheVRpbWUgXCIjbGVmdCAudGltZVwiLCB0MVxuICAgIGRpc3BsYXlUaW1lIFwiI3JpZ2h0IC50aW1lXCIsIHQyXG4gICAgXG4gICAgIyByZXNldCBkaXNhYmxlZCBwcm9wZXJ0eVxuICAgICQoXCIjbGVmdCBpbnB1dFwiKS5wcm9wKFwiZGlzYWJsZWRcIiwgZmFsc2UpXG4gICAgJChcIiNyaWdodCBpbnB1dFwiKS5wcm9wKFwiZGlzYWJsZWRcIiwgZmFsc2UpXG4gICAgXG4gICAgIyByZXNldCBidXR0b24gY2xhc3Nlc1xuICAgIHJlc2V0QnV0dG9uQ2xhc3NlcygpIl19
//# sourceURL=coffeescript