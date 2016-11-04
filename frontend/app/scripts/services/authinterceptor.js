'use strict';


angular.module('psJwtApp')
  .service('authInterceptor', function (authToken) {
      return {
        request: function(config) {
          var token = authToken.getToken();
          if(token)
              config.headers['authorization'] = 'Bearer ' + token

          console.log(config.headers, token)
            return config
        },

        response : function(response) {
            //console.log(response)
            return response
        }
      }
  });
