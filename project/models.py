# class Equipment(models.Model):
#     name = models.CharField(max_length=100, null=False, unique=True)
#
#     def __str__(self):
#         return self.name
#
# TODO пока бесполезно
# class Organization(models.Model):
#     short_name = models.CharField(max_length=10, unique=True)
#     full_name = models.CharField(max_length=100, unique=True)
#
#     def __str__(self):
#         return self.short_name
#
#
# class Subject(models.Model):
#     name = models.CharField(max_length=100)
#
#     def __str__(self):
#         return f"Subject(id: {self.id}, name: {self.name})"
#
# TODO пока бесполезно
# class Location(models.Model):
#     building = models.CharField(max_length=100, unique=True, null=False)
#     organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
#
#     def __str__(self):
#         return f"{self.organization.short_name}, Корпус {self.building}"
#
#
# class Faculty(models.Model):
#     name = models.CharField(max_length=100, unique=True)
#     number = models.IntegerField()
#
#     def __str__(self):
#         return str(self.number)
#
#
# class Auditorium(models.Model):
#     number = models.CharField(max_length=10)
#     size = models.IntegerField(null=False, default=0)
#     equipment = models.ForeignKey(Equipment, null=True, on_delete=models.SET_NULL)
#     organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
#     location = models.ForeignKey(Location, on_delete=models.CASCADE)
#     description = models.TextField(default="")
#
#     def __str__(self):
#         return (f"Auditorium("
#                 f"id: {self.id}, "
#                 f"number: {self.number}, "
#                 f"size: {self.size}, "
#                 f"equipment: {self.equipment.name}, "
#                 f"organization: {self.organization.short_name}, "
#                 f"location: {self.location.building}, "
#                 f"description: {self.description}"
#                 f")")
#
#
# class Employee(models.Model):
#     first_name = models.CharField(max_length=30, null=False)
#     patronymic = models.CharField(max_length=30, null=False)
#     last_name = models.CharField(max_length=30, null=False)
#     email = models.EmailField(null=False)
#     phone = models.CharField(max_length=15, null=False)
#     organization = models.ForeignKey(Organization, null=True, on_delete=models.SET_NULL)
#     faculty = models.ForeignKey(Faculty, null=True, on_delete=models.SET_NULL)
#
#     def get_name(self):
#         return f'{self.last_name} {self.first_name[0]}. {self.patronymic[0]}.'
#
#     def __str__(self):
#         return (f"Tutor("
#                 f"id: {self.id}, "
#                 f"name: {self.get_name()}, "
#                 f"email: {self.email}, "
#                 f"phone: {self.phone}, "
#                 f"organization: {self.organization.short_name}, "
#                 f"faculty: {self.faculty.number}"
#                 f")")
#
#
# class Lecture(models.Model):
#     employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
#     subject = models.ForeignKey(Subject, null=True, on_delete=models.SET_NULL)
#     auditorium = models.ForeignKey(Auditorium, on_delete=models.CASCADE)
#     date = models.DateField()
#     start = models.TimeField()
#     end = models.TimeField()
#
#     def __str__(self):
#         return (f"Lecture("
#                 f"id: {self.id}, "
#                 f"employee: {self.employee.get_name()}, "
#                 f"subject: {self.subject.name}, "
#                 f"auditorium: {self.auditorium.number}, "
#                 f"date: {self.date}, "
#                 f"start: {self.start}, "
#                 f"end: {self.end}"
#                 f")")
#