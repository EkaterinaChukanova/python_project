from django.db import models

from apps.core.models import Equipment, Organization, Location

class Auditorium(models.Model):
    number = models.CharField(max_length=10)
    size = models.IntegerField(null=False, default=0)
    equipment = models.ForeignKey(Equipment, null=True, on_delete=models.SET_NULL)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    description = models.TextField(default="")

    def __str__(self):
        return (f"Auditorium("
                f"id: {self.id}, "
                f"number: {self.number}, "
                f"size: {self.size}, "
                f"equipment: {self.equipment.name}, "
                f"organization: {self.organization.short_name}, "
                f"location: {self.location.building}, "
                f"description: {self.description}"
                f")")
