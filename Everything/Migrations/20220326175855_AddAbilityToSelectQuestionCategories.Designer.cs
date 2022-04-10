﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using everything.Data;

namespace everything.Migrations
{
    [DbContext(typeof(EverythingContext))]
    [Migration("20220326175855_AddAbilityToSelectQuestionCategories")]
    partial class AddAbilityToSelectQuestionCategories
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.12")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("everything.Models.Account", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("BudgetId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsInvesting")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("BudgetId");

                    b.ToTable("Accounts");
                });

            modelBuilder.Entity("everything.Models.Budget", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Budgets");
                });

            modelBuilder.Entity("everything.Models.Expense", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ExpenseBudgetId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ExpenseBudgetId");

                    b.ToTable("Expenses");
                });

            modelBuilder.Entity("everything.Models.ExpenseBudget", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("BudgetId")
                        .HasColumnType("int");

                    b.Property<int?>("DeductionAccountId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsActual")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("BudgetId");

                    b.HasIndex("DeductionAccountId");

                    b.ToTable("ExpenseBudgets");
                });

            modelBuilder.Entity("everything.Models.Game", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Games");
                });

            modelBuilder.Entity("everything.Models.GameQuestion", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("GameId")
                        .HasColumnType("int");

                    b.Property<bool>("IsDouble")
                        .HasColumnType("bit");

                    b.Property<bool>("NobodyGotRight")
                        .HasColumnType("bit");

                    b.Property<int>("Points")
                        .HasColumnType("int");

                    b.Property<int>("QuestionId")
                        .HasColumnType("int");

                    b.Property<int>("Round")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("GameId");

                    b.HasIndex("QuestionId");

                    b.ToTable("GameQuestions");
                });

            modelBuilder.Entity("everything.Models.IncomeSource", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("BudgetId")
                        .HasColumnType("int");

                    b.Property<int?>("DepositAccountId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("BudgetId");

                    b.HasIndex("DepositAccountId");

                    b.ToTable("IncomeSources");
                });

            modelBuilder.Entity("everything.Models.IncomeSourceDeduction", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int?>("DepositAccountId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("IncomeSourceId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("DepositAccountId");

                    b.HasIndex("IncomeSourceId");

                    b.ToTable("IncomeSourceDeductions");
                });

            modelBuilder.Entity("everything.Models.Lift", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<int>("LiftTypeId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("VideoLink")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("LiftTypeId");

                    b.ToTable("Lifts");
                });

            modelBuilder.Entity("everything.Models.LiftDayPlan", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("LiftDayPlans");
                });

            modelBuilder.Entity("everything.Models.LiftSet", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<int>("LiftId")
                        .HasColumnType("int");

                    b.Property<int?>("Number")
                        .HasColumnType("int");

                    b.Property<int?>("Reps")
                        .HasColumnType("int");

                    b.Property<int?>("Weight")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("LiftId");

                    b.ToTable("LiftSets");
                });

            modelBuilder.Entity("everything.Models.LiftType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("LiftType");
                });

            modelBuilder.Entity("everything.Models.MuscleGroup", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("MuscleGroups");
                });

            modelBuilder.Entity("everything.Models.MuscleGroupForLift", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("LiftId")
                        .HasColumnType("int");

                    b.Property<int>("MuscleGroupId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("LiftId");

                    b.HasIndex("MuscleGroupId");

                    b.ToTable("MuscleGroupForLifts");
                });

            modelBuilder.Entity("everything.Models.MuscleGroupForLiftDayPlan", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("LiftDayPlanId")
                        .HasColumnType("int");

                    b.Property<int>("MuscleGroupId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("LiftDayPlanId");

                    b.HasIndex("MuscleGroupId");

                    b.ToTable("MuscleGroupForLiftDayPlans");
                });

            modelBuilder.Entity("everything.Models.Player", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Amount")
                        .HasColumnType("int");

                    b.Property<string>("ColorHexCode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("GameId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("GameId");

                    b.ToTable("Players");
                });

            modelBuilder.Entity("everything.Models.Question", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Answer")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("QuestionCategoryId")
                        .HasColumnType("int");

                    b.Property<string>("Statement")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("QuestionCategoryId");

                    b.ToTable("Questions");
                });

            modelBuilder.Entity("everything.Models.QuestionAnswer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("Bet")
                        .HasColumnType("int");

                    b.Property<int>("GameQuestionId")
                        .HasColumnType("int");

                    b.Property<int>("PlayerId")
                        .HasColumnType("int");

                    b.Property<bool>("WasRight")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.HasIndex("GameQuestionId");

                    b.HasIndex("PlayerId");

                    b.ToTable("QuestionAnswers");
                });

            modelBuilder.Entity("everything.Models.QuestionCategory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("IsSelected")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("QuestionCategories");
                });

            modelBuilder.Entity("everything.Models.ToDoBoard", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Sequence")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("ToDoBoards");
                });

            modelBuilder.Entity("everything.Models.ToDoColumn", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Sequence")
                        .HasColumnType("int");

                    b.Property<int>("ToDoBoardId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ToDoBoardId");

                    b.ToTable("ToDoColumns");
                });

            modelBuilder.Entity("everything.Models.ToDoItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DueDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Sequence")
                        .HasColumnType("int");

                    b.Property<int>("ToDoColumnId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ToDoColumnId");

                    b.ToTable("ToDoItems");
                });

            modelBuilder.Entity("everything.Models.ToDoItemTask", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Completed")
                        .HasColumnType("bit");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Sequence")
                        .HasColumnType("int");

                    b.Property<int>("ToDoItemId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ToDoItemId");

                    b.ToTable("ToDoItemTasks");
                });

            modelBuilder.Entity("everything.Models.Account", b =>
                {
                    b.HasOne("everything.Models.Budget", "Budget")
                        .WithMany("Accounts")
                        .HasForeignKey("BudgetId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Budget");
                });

            modelBuilder.Entity("everything.Models.Expense", b =>
                {
                    b.HasOne("everything.Models.ExpenseBudget", "ExpenseBudget")
                        .WithMany("Expenses")
                        .HasForeignKey("ExpenseBudgetId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("ExpenseBudget");
                });

            modelBuilder.Entity("everything.Models.ExpenseBudget", b =>
                {
                    b.HasOne("everything.Models.Budget", "Budget")
                        .WithMany("ExpenseBudgets")
                        .HasForeignKey("BudgetId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("everything.Models.Account", "DeductionAccount")
                        .WithMany("ExpenseBudgetDeductions")
                        .HasForeignKey("DeductionAccountId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("Budget");

                    b.Navigation("DeductionAccount");
                });

            modelBuilder.Entity("everything.Models.GameQuestion", b =>
                {
                    b.HasOne("everything.Models.Game", "Game")
                        .WithMany("GameQuestions")
                        .HasForeignKey("GameId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("everything.Models.Question", "Question")
                        .WithMany("GameQuestions")
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Game");

                    b.Navigation("Question");
                });

            modelBuilder.Entity("everything.Models.IncomeSource", b =>
                {
                    b.HasOne("everything.Models.Budget", "Budget")
                        .WithMany("IncomeSources")
                        .HasForeignKey("BudgetId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("everything.Models.Account", "DepositAccount")
                        .WithMany("IncomeDeposits")
                        .HasForeignKey("DepositAccountId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("Budget");

                    b.Navigation("DepositAccount");
                });

            modelBuilder.Entity("everything.Models.IncomeSourceDeduction", b =>
                {
                    b.HasOne("everything.Models.Account", "DepositAccount")
                        .WithMany("IncomeDeductionDeposits")
                        .HasForeignKey("DepositAccountId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("everything.Models.IncomeSource", "IncomeSource")
                        .WithMany("Deductions")
                        .HasForeignKey("IncomeSourceId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("DepositAccount");

                    b.Navigation("IncomeSource");
                });

            modelBuilder.Entity("everything.Models.Lift", b =>
                {
                    b.HasOne("everything.Models.LiftType", "LiftType")
                        .WithMany("Lifts")
                        .HasForeignKey("LiftTypeId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("LiftType");
                });

            modelBuilder.Entity("everything.Models.LiftSet", b =>
                {
                    b.HasOne("everything.Models.Lift", "Lift")
                        .WithMany("LiftSets")
                        .HasForeignKey("LiftId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Lift");
                });

            modelBuilder.Entity("everything.Models.MuscleGroupForLift", b =>
                {
                    b.HasOne("everything.Models.Lift", "Lift")
                        .WithMany("MuscleGroupLinks")
                        .HasForeignKey("LiftId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("everything.Models.MuscleGroup", "MuscleGroup")
                        .WithMany("MuscleGroupForLiftsLinks")
                        .HasForeignKey("MuscleGroupId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Lift");

                    b.Navigation("MuscleGroup");
                });

            modelBuilder.Entity("everything.Models.MuscleGroupForLiftDayPlan", b =>
                {
                    b.HasOne("everything.Models.LiftDayPlan", "LiftDayPlan")
                        .WithMany("MuscleGroupForLiftsLinks")
                        .HasForeignKey("LiftDayPlanId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("everything.Models.MuscleGroup", "MuscleGroup")
                        .WithMany("MuscleGroupForPlanLinks")
                        .HasForeignKey("MuscleGroupId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("LiftDayPlan");

                    b.Navigation("MuscleGroup");
                });

            modelBuilder.Entity("everything.Models.Player", b =>
                {
                    b.HasOne("everything.Models.Game", "Game")
                        .WithMany("Players")
                        .HasForeignKey("GameId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Game");
                });

            modelBuilder.Entity("everything.Models.Question", b =>
                {
                    b.HasOne("everything.Models.QuestionCategory", "QuestionCategory")
                        .WithMany("Questions")
                        .HasForeignKey("QuestionCategoryId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("QuestionCategory");
                });

            modelBuilder.Entity("everything.Models.QuestionAnswer", b =>
                {
                    b.HasOne("everything.Models.GameQuestion", "GameQuestion")
                        .WithMany("QuestionAnswers")
                        .HasForeignKey("GameQuestionId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("everything.Models.Player", "Player")
                        .WithMany("QuestionAnswers")
                        .HasForeignKey("PlayerId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("GameQuestion");

                    b.Navigation("Player");
                });

            modelBuilder.Entity("everything.Models.ToDoColumn", b =>
                {
                    b.HasOne("everything.Models.ToDoBoard", "ToDoBoard")
                        .WithMany("ToDoColumns")
                        .HasForeignKey("ToDoBoardId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("ToDoBoard");
                });

            modelBuilder.Entity("everything.Models.ToDoItem", b =>
                {
                    b.HasOne("everything.Models.ToDoColumn", "ToDoColumn")
                        .WithMany("ToDoItems")
                        .HasForeignKey("ToDoColumnId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("ToDoColumn");
                });

            modelBuilder.Entity("everything.Models.ToDoItemTask", b =>
                {
                    b.HasOne("everything.Models.ToDoItem", "ToDoItem")
                        .WithMany("Tasks")
                        .HasForeignKey("ToDoItemId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("ToDoItem");
                });

            modelBuilder.Entity("everything.Models.Account", b =>
                {
                    b.Navigation("ExpenseBudgetDeductions");

                    b.Navigation("IncomeDeductionDeposits");

                    b.Navigation("IncomeDeposits");
                });

            modelBuilder.Entity("everything.Models.Budget", b =>
                {
                    b.Navigation("Accounts");

                    b.Navigation("ExpenseBudgets");

                    b.Navigation("IncomeSources");
                });

            modelBuilder.Entity("everything.Models.ExpenseBudget", b =>
                {
                    b.Navigation("Expenses");
                });

            modelBuilder.Entity("everything.Models.Game", b =>
                {
                    b.Navigation("GameQuestions");

                    b.Navigation("Players");
                });

            modelBuilder.Entity("everything.Models.GameQuestion", b =>
                {
                    b.Navigation("QuestionAnswers");
                });

            modelBuilder.Entity("everything.Models.IncomeSource", b =>
                {
                    b.Navigation("Deductions");
                });

            modelBuilder.Entity("everything.Models.Lift", b =>
                {
                    b.Navigation("LiftSets");

                    b.Navigation("MuscleGroupLinks");
                });

            modelBuilder.Entity("everything.Models.LiftDayPlan", b =>
                {
                    b.Navigation("MuscleGroupForLiftsLinks");
                });

            modelBuilder.Entity("everything.Models.LiftType", b =>
                {
                    b.Navigation("Lifts");
                });

            modelBuilder.Entity("everything.Models.MuscleGroup", b =>
                {
                    b.Navigation("MuscleGroupForLiftsLinks");

                    b.Navigation("MuscleGroupForPlanLinks");
                });

            modelBuilder.Entity("everything.Models.Player", b =>
                {
                    b.Navigation("QuestionAnswers");
                });

            modelBuilder.Entity("everything.Models.Question", b =>
                {
                    b.Navigation("GameQuestions");
                });

            modelBuilder.Entity("everything.Models.QuestionCategory", b =>
                {
                    b.Navigation("Questions");
                });

            modelBuilder.Entity("everything.Models.ToDoBoard", b =>
                {
                    b.Navigation("ToDoColumns");
                });

            modelBuilder.Entity("everything.Models.ToDoColumn", b =>
                {
                    b.Navigation("ToDoItems");
                });

            modelBuilder.Entity("everything.Models.ToDoItem", b =>
                {
                    b.Navigation("Tasks");
                });
#pragma warning restore 612, 618
        }
    }
}
